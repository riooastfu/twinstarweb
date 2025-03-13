// app/api/packages/itinerary/[itineraryId]/meals/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateMealRequest } from "@/types/package";

interface MealsParams {
    params: {
        itineraryId: string;
    };
}

// GET - Fetch all meals for an itinerary day
export async function GET(req: NextRequest, { params }: MealsParams) {
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

        // Fetch meals
        const meals = await db.itineraryMeal.findMany({
            where: { itineraryId }
        });

        return createSuccessResponse(meals);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new meal to an itinerary day
export async function POST(req: NextRequest, { params }: MealsParams) {
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
        const body: CreateMealRequest = await req.json();

        // Validate required fields
        if (!body.name) {
            return createErrorResponse("Meal name is required", 400);
        }

        // Validate meal name (e.g., breakfast, lunch, dinner)
        const validMeals = ['breakfast', 'lunch', 'dinner', 'snack'];
        if (!validMeals.includes(body.name.toLowerCase())) {
            return createErrorResponse(`Meal name must be one of: ${validMeals.join(', ')}`, 400);
        }

        // Check if this meal type already exists for the day
        const existingMeal = await db.itineraryMeal.findFirst({
            where: {
                itineraryId,
                name: { equals: body.name }
            }
        });

        if (existingMeal) {
            return createErrorResponse(`${body.name} already exists for this itinerary day`, 400);
        }

        // Create meal
        const newMeal = await db.itineraryMeal.create({
            data: {
                name: body.name.toLowerCase(),
                itineraryId
            }
        });

        return createSuccessResponse(newMeal, "Meal added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}