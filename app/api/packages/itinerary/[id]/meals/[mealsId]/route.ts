// app/api/packages/itinerary/meals/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateMealRequest } from "@/types/package";

interface MealParams {
    params: {
        mealsId: string;
    };
}

// GET - Fetch a specific meal
export async function GET(req: NextRequest, { params }: MealParams) {
    try {
        const paramsData = await params;
        const mealId = paramsData.mealsId;

        if (!mealId) {
            return createErrorResponse("Meal ID is required", 400);
        }

        const meal = await db.itineraryMeal.findUnique({
            where: { id: mealId }
        });

        if (!meal) {
            return createErrorResponse("Meal not found", 404);
        }

        return createSuccessResponse(meal);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update a meal
export async function PUT(req: NextRequest, { params }: MealParams) {
    try {
        const paramsData = await params;
        const mealId = paramsData.mealsId;

        if (!mealId) {
            return createErrorResponse("Meal ID is required", 400);
        }

        // Parse request body
        const body: UpdateMealRequest = await req.json();

        // Check if meal exists
        const existingMeal = await db.itineraryMeal.findUnique({
            where: { id: mealId }
        });

        if (!existingMeal) {
            return createErrorResponse("Meal not found", 404);
        }

        // Validate meal name if provided
        if (body.name) {
            const validMeals = ['breakfast', 'lunch', 'dinner', 'snack'];
            if (!validMeals.includes(body.name.toLowerCase())) {
                return createErrorResponse(`Meal name must be one of: ${validMeals.join(', ')}`, 400);
            }

            // Check for conflicts if changing meal type
            if (body.name.toLowerCase() !== existingMeal.name) {
                const mealConflict = await db.itineraryMeal.findFirst({
                    where: {
                        itineraryId: existingMeal.itineraryId,
                        name: { equals: body.name },
                        id: { not: mealId }
                    }
                });

                if (mealConflict) {
                    return createErrorResponse(`${body.name} already exists for this itinerary day`, 400);
                }
            }
        }

        // Update meal
        const updatedMeal = await db.itineraryMeal.update({
            where: { id: mealId },
            data: {
                ...(body.name && { name: body.name.toLowerCase() }),
                ...(body.itineraryId && { itineraryId: body.itineraryId })
            }
        });

        return createSuccessResponse(updatedMeal, "Meal updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete a meal
export async function DELETE(req: NextRequest, { params }: MealParams) {
    try {
        const paramsData = await params;
        const mealId = paramsData.mealsId;

        if (!mealId) {
            return createErrorResponse("Meal ID is required", 400);
        }

        // Check if meal exists
        const existingMeal = await db.itineraryMeal.findUnique({
            where: { id: mealId }
        });

        if (!existingMeal) {
            return createErrorResponse("Meal not found", 404);
        }

        // Delete meal
        await db.itineraryMeal.delete({
            where: { id: mealId }
        });

        return createSuccessResponse(null, "Meal deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}