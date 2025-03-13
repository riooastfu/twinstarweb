// app/api/packages/exclusions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateExclusionRequest } from "@/types/package";

interface ExclusionItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific exclusion
export async function GET(req: NextRequest, { params }: ExclusionItemParams) {
    try {
        const paramsData = await params;
        const exclusionId = paramsData.id;

        if (!exclusionId) {
            return createErrorResponse("Exclusion ID is required", 400);
        }

        const exclusion = await db.packageExclusion.findUnique({
            where: { id: exclusionId }
        });

        if (!exclusion) {
            return createErrorResponse("Exclusion not found", 404);
        }

        return createSuccessResponse(exclusion);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update an exclusion
export async function PUT(req: NextRequest, { params }: ExclusionItemParams) {
    try {
        const paramsData = await params;
        const exclusionId = paramsData.id;

        if (!exclusionId) {
            return createErrorResponse("Exclusion ID is required", 400);
        }

        // Parse request body
        const body: UpdateExclusionRequest = await req.json();

        // Check if exclusion exists
        const existingExclusion = await db.packageExclusion.findUnique({
            where: { id: exclusionId }
        });

        if (!existingExclusion) {
            return createErrorResponse("Exclusion not found", 404);
        }

        // Validate data
        if (body.description === '') {
            return createErrorResponse("Exclusion description cannot be empty", 400);
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

        // Update exclusion
        const updatedExclusion = await db.packageExclusion.update({
            where: { id: exclusionId },
            data: {
                ...(body.description && { description: body.description }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedExclusion, "Exclusion updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete an exclusion
export async function DELETE(req: NextRequest, { params }: ExclusionItemParams) {
    try {
        const paramsData = await params;
        const exclusionId = paramsData.id;

        if (!exclusionId) {
            return createErrorResponse("Exclusion ID is required", 400);
        }

        // Check if exclusion exists
        const existingExclusion = await db.packageExclusion.findUnique({
            where: { id: exclusionId }
        });

        if (!existingExclusion) {
            return createErrorResponse("Exclusion not found", 404);
        }

        // Delete exclusion
        await db.packageExclusion.delete({
            where: { id: exclusionId }
        });

        return createSuccessResponse(null, "Exclusion deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}