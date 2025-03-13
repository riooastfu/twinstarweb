// app/api/packages/[packageId]/dates/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateDateRequest } from "@/types/package";

interface DateParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all available dates for a package
export async function GET(req: NextRequest, { params }: DateParams) {
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

        // Fetch dates, ordering by date
        const dates = await db.packageDate.findMany({
            where: { packageId },
            orderBy: { date: 'asc' }
        });

        return createSuccessResponse(dates);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new available date
export async function POST(req: NextRequest, { params }: DateParams) {
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
        const body: CreateDateRequest = await req.json();

        // Validate required fields
        if (!body.date) {
            return createErrorResponse("Date is required", 400);
        }

        // Parse and validate date
        let parsedDate: Date;
        try {
            parsedDate = new Date(body.date);
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Invalid date');
            }
        } catch (error) {
            return createErrorResponse("Invalid date format. Please use ISO format (YYYY-MM-DD)", 400);
        }

        // Ensure date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (parsedDate < today) {
            return createErrorResponse("Date must be in the future", 400);
        }

        // Check if this date already exists for the package
        const existingDate = await db.packageDate.findFirst({
            where: {
                packageId,
                date: parsedDate
            }
        });

        if (existingDate) {
            return createErrorResponse("This date is already available for this package", 400);
        }

        // Create date with spots
        const newDate = await db.packageDate.create({
            data: {
                date: parsedDate,
                spots: body.spots || 15, // Default to 15 spots if not specified
                packageId
            }
        });

        return createSuccessResponse(newDate, "Available date added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}