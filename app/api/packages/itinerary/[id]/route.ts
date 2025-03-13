// app/api/packages/itinerary/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateItineraryRequest } from "@/types/package";

interface ItineraryItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific itinerary day
export async function GET(req: NextRequest, { params }: ItineraryItemParams) {
    try {
        const paramsData = await params;
        const itineraryId = paramsData.id;

        if (!itineraryId) {
            return createErrorResponse("Itinerary ID is required", 400);
        }

        const itineraryDay = await db.packageItinerary.findUnique({
            where: { id: itineraryId },
            include: {
                activities: true,
                meals: true
            }
        });

        if (!itineraryDay) {
            return createErrorResponse("Itinerary day not found", 404);
        }

        return createSuccessResponse(itineraryDay);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update an itinerary day
export async function PUT(req: NextRequest, { params }: ItineraryItemParams) {
    try {
        const paramsData = await params;
        const itineraryId = paramsData.id;

        if (!itineraryId) {
            return createErrorResponse("Itinerary ID is required", 400);
        }

        // Parse request body
        const body: UpdateItineraryRequest = await req.json();

        // Check if itinerary day exists
        const existingItinerary = await db.packageItinerary.findUnique({
            where: { id: itineraryId },
            include: { package: { select: { id: true } } }
        });

        if (!existingItinerary) {
            return createErrorResponse("Itinerary day not found", 404);
        }

        // If updating the day number, check for conflicts
        if (body.day !== undefined && body.day !== existingItinerary.day) {
            const conflictDay = await db.packageItinerary.findFirst({
                where: {
                    packageId: existingItinerary.package.id,
                    day: body.day,
                    id: { not: itineraryId }
                }
            });

            if (conflictDay) {
                return createErrorResponse(`Day ${body.day} already exists in this package's itinerary`, 400);
            }
        }

        // Update itinerary day
        const updatedItinerary = await db.packageItinerary.update({
            where: { id: itineraryId },
            data: {
                ...(body.day !== undefined && { day: body.day }),
                ...(body.title !== undefined && { title: body.title }),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.accommodation !== undefined && { accommodation: body.accommodation }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedItinerary, "Itinerary day updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete an itinerary day
export async function DELETE(req: NextRequest, { params }: ItineraryItemParams) {
    try {
        const paramsData = await params;
        const itineraryId = paramsData.id;

        if (!itineraryId) {
            return createErrorResponse("Itinerary ID is required", 400);
        }

        // Check if itinerary day exists
        const existingItinerary = await db.packageItinerary.findUnique({
            where: { id: itineraryId }
        });

        if (!existingItinerary) {
            return createErrorResponse("Itinerary day not found", 404);
        }

        // Delete itinerary day (this will cascade delete associated activities and meals)
        await db.packageItinerary.delete({
            where: { id: itineraryId }
        });

        return createSuccessResponse(null, "Itinerary day deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}