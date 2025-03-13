// app/api/packages/[packageId]/exclusions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateExclusionRequest } from "@/types/package";

interface ExclusionParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all exclusions for a package
export async function GET(req: NextRequest, { params }: ExclusionParams) {
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

        // Fetch exclusions
        const exclusions = await db.packageExclusion.findMany({
            where: { packageId }
        });

        return createSuccessResponse(exclusions);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new exclusion
export async function POST(req: NextRequest, { params }: ExclusionParams) {
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
        const body: CreateExclusionRequest = await req.json();

        // Validate required fields
        if (!body.description) {
            return createErrorResponse("Exclusion description is required", 400);
        }

        // Create exclusion
        const newExclusion = await db.packageExclusion.create({
            data: {
                description: body.description,
                packageId
            }
        });

        return createSuccessResponse(newExclusion, "Exclusion added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}