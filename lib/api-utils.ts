// lib/api-utils.ts
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/package";

/**
 * Create a standardized successful API response
 */
export function createSuccessResponse<T>(
    data: T,
    message?: string,
    status: number = 200
): NextResponse {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message
    };

    return NextResponse.json(response, { status });
}

/**
 * Create a standardized error API response
 */
export function createErrorResponse(
    error: string,
    status: number = 500
): NextResponse {
    const response: ApiResponse<null> = {
        success: false,
        error
    };

    return NextResponse.json(response, { status });
}

/**
 * Handles common API errors and returns appropriate error responses
 */
export function handleApiError(error: unknown): NextResponse {
    console.error("API Error:", error);

    if (error instanceof Error) {
        // Check for Prisma-specific errors
        if (error.name === 'PrismaClientKnownRequestError') {
            // Handle specific Prisma errors by code
            if ((error as any).code === 'P2025') {
                return createErrorResponse("Record not found", 404);
            }
            if ((error as any).code === 'P2002') {
                return createErrorResponse("Unique constraint violation", 400);
            }
            if ((error as any).code === 'P2003') {
                return createErrorResponse("Foreign key constraint violation", 400);
            }
        }

        // Other specific error types
        if (error.name === 'ValidationError') {
            return createErrorResponse(`Validation error: ${error.message}`, 400);
        }

        return createErrorResponse(error.message || "An unexpected error occurred");
    }

    return createErrorResponse("An unknown error occurred");
}