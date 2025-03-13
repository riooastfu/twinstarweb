// app/api/packages/itinerary/activities/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateActivityRequest } from "@/types/package";

interface ActivityParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific activity
export async function GET(req: NextRequest, { params }: ActivityParams) {
    try {
        const paramsData = await params;
        const activityId = paramsData.id;

        if (!activityId) {
            return createErrorResponse("Activity ID is required", 400);
        }

        const activity = await db.itineraryActivity.findUnique({
            where: { id: activityId }
        });

        if (!activity) {
            return createErrorResponse("Activity not found", 404);
        }

        return createSuccessResponse(activity);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update an activity
export async function PUT(req: NextRequest, { params }: ActivityParams) {
    try {
        const paramsData = await params;
        const activityId = paramsData.id;

        if (!activityId) {
            return createErrorResponse("Activity ID is required", 400);
        }

        // Parse request body
        const body: UpdateActivityRequest = await req.json();

        // Check if activity exists
        const existingActivity = await db.itineraryActivity.findUnique({
            where: { id: activityId }
        });

        if (!existingActivity) {
            return createErrorResponse("Activity not found", 404);
        }

        // Validate data
        if (body.name === '') {
            return createErrorResponse("Activity name cannot be empty", 400);
        }

        // If changing itinerary, verify the itinerary exists
        if (body.itineraryId) {
            const itineraryExists = await db.packageItinerary.findUnique({
                where: { id: body.itineraryId },
                select: { id: true }
            });

            if (!itineraryExists) {
                return createErrorResponse("Target itinerary day not found", 404);
            }
        }

        // Update activity
        const updatedActivity = await db.itineraryActivity.update({
            where: { id: activityId },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.itineraryId && { itineraryId: body.itineraryId })
            }
        });

        return createSuccessResponse(updatedActivity, "Activity updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete an activity
export async function DELETE(req: NextRequest, { params }: ActivityParams) {
    try {
        const paramsData = await params;
        const activityId = paramsData.id;

        if (!activityId) {
            return createErrorResponse("Activity ID is required", 400);
        }

        // Check if activity exists
        const existingActivity = await db.itineraryActivity.findUnique({
            where: { id: activityId }
        });

        if (!existingActivity) {
            return createErrorResponse("Activity not found", 404);
        }

        // Delete activity
        await db.itineraryActivity.delete({
            where: { id: activityId }
        });

        return createSuccessResponse(null, "Activity deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}