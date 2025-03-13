// app/api/packages/inclusions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateInclusionRequest } from "@/types/package";

interface InclusionItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific inclusion
export async function GET(req: NextRequest, { params }: InclusionItemParams) {
    try {
        const paramsData = await params;
        const inclusionId = paramsData.id;

        if (!inclusionId) {
            return createErrorResponse("Inclusion ID is required", 400);
        }

        const inclusion = await db.packageInclusion.findUnique({
            where: { id: inclusionId }
        });

        if (!inclusion) {
            return createErrorResponse("Inclusion not found", 404);
        }

        return createSuccessResponse(inclusion);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update an inclusion
export async function PUT(req: NextRequest, { params }: InclusionItemParams) {
    try {
        const paramsData = await params;
        const inclusionId = paramsData.id;

        if (!inclusionId) {
            return createErrorResponse("Inclusion ID is required", 400);
        }

        // Parse request body
        const body: UpdateInclusionRequest = await req.json();

        // Check if inclusion exists
        const existingInclusion = await db.packageInclusion.findUnique({
            where: { id: inclusionId }
        });

        if (!existingInclusion) {
            return createErrorResponse("Inclusion not found", 404);
        }

        // Validate data
        if (body.description === '') {
            return createErrorResponse("Inclusion description cannot be empty", 400);
        }

        // If changing package, verify the package exists
        if (body.packageId) {
            const packageExists = await db.masterPackage.findUnique({
                where: { id: body.packageId },
                select: { id: true }
            });

            if (!packageExists) {
                return createErrorResponse("Target package not found", 404);
            }
        }

        // Update inclusion
        const updatedInclusion = await db.packageInclusion.update({
            where: { id: inclusionId },
            data: {
                ...(body.description && { description: body.description }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedInclusion, "Inclusion updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete an inclusion
export async function DELETE(req: NextRequest, { params }: InclusionItemParams) {
    try {
        const paramsData = await params;
        const inclusionId = paramsData.id;

        if (!inclusionId) {
            return createErrorResponse("Inclusion ID is required", 400);
        }

        // Check if inclusion exists
        const existingInclusion = await db.packageInclusion.findUnique({
            where: { id: inclusionId }
        });

        if (!existingInclusion) {
            return createErrorResponse("Inclusion not found", 404);
        }

        // Delete inclusion
        await db.packageInclusion.delete({
            where: { id: inclusionId }
        });

        return createSuccessResponse(null, "Inclusion deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}