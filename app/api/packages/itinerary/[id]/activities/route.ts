// app/api/packages/itinerary/[itineraryId]/activities/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateActivityRequest } from "@/types/package";

interface ActivitiesParams {
  params: {
    itineraryId: string;
  };
}

// GET - Fetch all activities for an itinerary day
export async function GET(req: NextRequest, { params }: ActivitiesParams) {
  try {
    const paramsData = await params;
    const itineraryId = paramsData.itineraryId;

    if (!itineraryId) {
      return createErrorResponse("Itinerary ID is required", 400);
    }

    // Check if itinerary day exists
    const itineraryExists = await db.packageItinerary.findUnique({
      where: { id: itineraryId },
      select: { id: true }
    });

    if (!itineraryExists) {
      return createErrorResponse("Itinerary day not found", 404);
    }

    // Fetch activities
    const activities = await db.itineraryActivity.findMany({
      where: { itineraryId }
    });

    return createSuccessResponse(activities);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - Add a new activity to an itinerary day
export async function POST(req: NextRequest, { params }: ActivitiesParams) {
  try {
    const paramsData = await params;
    const itineraryId = paramsData.itineraryId;

    if (!itineraryId) {
      return createErrorResponse("Itinerary ID is required", 400);
    }

    // Check if itinerary day exists
    const itineraryExists = await db.packageItinerary.findUnique({
      where: { id: itineraryId },
      select: { id: true }
    });

    if (!itineraryExists) {
      return createErrorResponse("Itinerary day not found", 404);
    }

    // Parse request body
    const body: CreateActivityRequest = await req.json();

    // Validate required fields
    if (!body.name) {
      return createErrorResponse("Activity name is required", 400);
    }

    // Create activity
    const newActivity = await db.itineraryActivity.create({
      data: {
        name: body.name,
        itineraryId
      }
    });

    return createSuccessResponse(newActivity, "Activity added successfully", 201);
  } catch (error) {
    return handleApiError(error);
  }
}