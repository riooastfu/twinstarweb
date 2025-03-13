// app/api/packages/[packageId]/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateReviewRequest } from "@/types/package";

interface ReviewParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all reviews for a package
export async function GET(req: NextRequest, { params }: ReviewParams) {
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

        // Parse query parameters for pagination
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
        const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

        // Fetch reviews
        const reviews = await db.packageReview.findMany({
            where: { packageId },
            orderBy: { date: 'desc' },
            ...(limit !== undefined && { take: limit }),
            ...(offset !== undefined && { skip: offset })
        });

        // Get total count for pagination
        const totalCount = await db.packageReview.count({
            where: { packageId }
        });

        // Calculate average rating
        const averageRating = await db.packageReview.aggregate({
            where: { packageId },
            _avg: {
                rating: true
            }
        });

        return createSuccessResponse({
            reviews,
            meta: {
                total: totalCount,
                averageRating: averageRating._avg.rating || 0,
                limit,
                offset
            }
        });
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new review
export async function POST(req: NextRequest, { params }: ReviewParams) {
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
        const body: CreateReviewRequest = await req.json();

        // Validate required fields
        const requiredFields = ['name', 'rating', 'comment'];
        const missingFields = requiredFields.filter(field => !(field in body));

        if (missingFields.length > 0) {
            return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
        }

        // Validate rating
        if (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
            return createErrorResponse("Rating must be a number between 1 and 5", 400);
        }

        // Create review
        const newReview = await db.packageReview.create({
            data: {
                name: body.name,
                rating: body.rating,
                comment: body.comment,
                date: body.date ? new Date(body.date) : new Date(),
                packageId
            }
        });

        return createSuccessResponse(newReview, "Review added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}