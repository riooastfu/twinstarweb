// app/api/packages/[packageId]/itinerary/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateItineraryRequest } from "@/types/package";

interface ItineraryParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all itinerary days for a package
export async function GET(req: NextRequest, { params }: ItineraryParams) {
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

        // Fetch itinerary days with activities and meals
        const itinerary = await db.packageItinerary.findMany({
            where: { packageId },
            include: {
                activities: true,
                meals: true
            },
            orderBy: {
                day: 'asc'
            }
        });

        return createSuccessResponse(itinerary);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new itinerary day
export async function POST(req: NextRequest, { params }: ItineraryParams) {
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
        const body: CreateItineraryRequest = await req.json();

        // Validate required fields
        const requiredFields = ['day', 'title', 'description'];
        const missingFields = requiredFields.filter(field => !(field in body));

        if (missingFields.length > 0) {
            return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
        }

        // Check if this day already exists for the package
        const existingDay = await db.packageItinerary.findFirst({
            where: {
                packageId,
                day: body.day
            }
        });

        if (existingDay) {
            return createErrorResponse(`Itinerary day ${body.day} already exists for this package`, 400);
        }

        // Create itinerary day
        const newItineraryDay = await db.packageItinerary.create({
            data: {
                day: body.day,
                title: body.title,
                description: body.description,
                accommodation: body.accommodation,
                packageId
            }
        });

        return createSuccessResponse(newItineraryDay, "Itinerary day added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}