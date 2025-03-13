// app/api/packages/reviews/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateReviewRequest } from "@/types/package";

interface ReviewItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific review
export async function GET(req: NextRequest, { params }: ReviewItemParams) {
    try {
        const paramsData = await params;
        const reviewId = paramsData.id;

        if (!reviewId) {
            return createErrorResponse("Review ID is required", 400);
        }

        const review = await db.packageReview.findUnique({
            where: { id: reviewId }
        });

        if (!review) {
            return createErrorResponse("Review not found", 404);
        }

        return createSuccessResponse(review);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update a review
export async function PUT(req: NextRequest, { params }: ReviewItemParams) {
    try {
        const paramsData = await params;
        const reviewId = paramsData.id;

        if (!reviewId) {
            return createErrorResponse("Review ID is required", 400);
        }

        // Parse request body
        const body: UpdateReviewRequest = await req.json();

        // Check if review exists
        const existingReview = await db.packageReview.findUnique({
            where: { id: reviewId }
        });

        if (!existingReview) {
            return createErrorResponse("Review not found", 404);
        }

        // Validate data
        if (body.rating !== undefined && (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5)) {
            return createErrorResponse("Rating must be a number between 1 and 5", 400);
        }

        // If changing package, verify the package exists
        if (body.packageId) {
            const packageExists = await db.masterPackage.findUnique({
                where: { id: body.packageId },
                select: { id: true }
            });

            if (!packageExists) {
                return createErrorResponse("Target package not found", 404);
            }
        }

        // Parse date if provided
        let parsedDate: Date | undefined;
        if (body.date) {
            try {
                parsedDate = new Date(body.date);
                if (isNaN(parsedDate.getTime())) {
                    throw new Error('Invalid date');
                }
            } catch (error) {
                return createErrorResponse("Invalid date format. Please use ISO format (YYYY-MM-DD)", 400);
            }
        }

        // Update review
        const updatedReview = await db.packageReview.update({
            where: { id: reviewId },
            data: {
                ...(body.name !== undefined && { name: body.name }),
                ...(body.rating !== undefined && { rating: body.rating }),
                ...(body.comment !== undefined && { comment: body.comment }),
                ...(parsedDate && { date: parsedDate }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedReview, "Review updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete a review
export async function DELETE(req: NextRequest, { params }: ReviewItemParams) {
    try {
        const paramsData = await params;
        const reviewId = paramsData.id;

        if (!reviewId) {
            return createErrorResponse("Review ID is required", 400);
        }

        // Check if review exists
        const existingReview = await db.packageReview.findUnique({
            where: { id: reviewId }
        });

        if (!existingReview) {
            return createErrorResponse("Review not found", 404);
        }

        // Delete review
        await db.packageReview.delete({
            where: { id: reviewId }
        });

        return createSuccessResponse(null, "Review deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}