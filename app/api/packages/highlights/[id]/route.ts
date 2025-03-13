// app/api/packages/highlights/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateHighlightRequest } from "@/types/package";

interface HighlightItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific highlight
export async function GET(req: NextRequest, { params }: HighlightItemParams) {
    try {
        const paramsData = await params;
        const highlightId = paramsData.id;

        if (!highlightId) {
            return createErrorResponse("Highlight ID is required", 400);
        }

        const highlight = await db.packageHighlight.findUnique({
            where: { id: highlightId }
        });

        if (!highlight) {
            return createErrorResponse("Highlight not found", 404);
        }

        return createSuccessResponse(highlight);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update a highlight
export async function PUT(req: NextRequest, { params }: HighlightItemParams) {
    try {
        const paramsData = await params;
        const highlightId = paramsData.id;

        if (!highlightId) {
            return createErrorResponse("Highlight ID is required", 400);
        }

        // Parse request body
        const body: UpdateHighlightRequest = await req.json();

        // Check if highlight exists
        const existingHighlight = await db.packageHighlight.findUnique({
            where: { id: highlightId }
        });

        if (!existingHighlight) {
            return createErrorResponse("Highlight not found", 404);
        }

        // Validate data
        if (body.description === '') {
            return createErrorResponse("Highlight description cannot be empty", 400);
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

        // Update highlight
        const updatedHighlight = await db.packageHighlight.update({
            where: { id: highlightId },
            data: {
                ...(body.description && { description: body.description }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedHighlight, "Highlight updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete a highlight
export async function DELETE(req: NextRequest, { params }: HighlightItemParams) {
    try {
        const paramsData = await params;
        const highlightId = paramsData.id;

        if (!highlightId) {
            return createErrorResponse("Highlight ID is required", 400);
        }

        // Check if highlight exists
        const existingHighlight = await db.packageHighlight.findUnique({
            where: { id: highlightId }
        });

        if (!existingHighlight) {
            return createErrorResponse("Highlight not found", 404);
        }

        // Delete highlight
        await db.packageHighlight.delete({
            where: { id: highlightId }
        });

        return createSuccessResponse(null, "Highlight deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}