// app/api/packages/[packageId]/inclusions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateInclusionRequest } from "@/types/package";

interface InclusionParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all inclusions for a package
export async function GET(req: NextRequest, { params }: InclusionParams) {
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

        // Fetch inclusions
        const inclusions = await db.packageInclusion.findMany({
            where: { packageId }
        });

        return createSuccessResponse(inclusions);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new inclusion
export async function POST(req: NextRequest, { params }: InclusionParams) {
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
        const body: CreateInclusionRequest = await req.json();

        // Validate required fields
        if (!body.description) {
            return createErrorResponse("Inclusion description is required", 400);
        }

        // Create inclusion
        const newInclusion = await db.packageInclusion.create({
            data: {
                description: body.description,
                packageId
            }
        });

        return createSuccessResponse(newInclusion, "Inclusion added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}