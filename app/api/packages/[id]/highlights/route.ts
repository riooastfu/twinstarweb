// app/api/packages/[packageId]/highlights/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateHighlightRequest } from "@/types/package";

interface HighlightParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all highlights for a package
export async function GET(req: NextRequest, { params }: HighlightParams) {
    try {
        const paramsData = await params;
        const packageId = paramsData.packageId;

        if (!packageId) {
            return createErrorResponse("Package ID is required", 400);
        }

        // Check if package exists
        const packageExists = await db.masterPackage.findUnique({
            where: { id: packageId },
            select: { id: true }
        });

        if (!packageExists) {
            return createErrorResponse("Package not found", 404);
        }

        // Fetch highlights
        const highlights = await db.packageHighlight.findMany({
            where: { packageId }
        });

        return createSuccessResponse(highlights);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new highlight
export async function POST(req: NextRequest, { params }: HighlightParams) {
    try {
        const paramsData = await params;
        const packageId = paramsData.packageId;

        if (!packageId) {
            return createErrorResponse("Package ID is required", 400);
        }

        // Check if package exists
        const packageExists = await db.masterPackage.findUnique({
            where: { id: packageId },
            select: { id: true }
        });

        if (!packageExists) {
            return createErrorResponse("Package not found", 404);
        }

        // Parse request body
        const body: CreateHighlightRequest = await req.json();

        // Validate required fields
        if (!body.description) {
            return createErrorResponse("Highlight description is required", 400);
        }

        // Create highlight
        const newHighlight = await db.packageHighlight.create({
            data: {
                description: body.description,
                packageId
            }
        });

        return createSuccessResponse(newHighlight, "Highlight added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}