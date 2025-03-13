// app/api/packages/dates/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateDateRequest } from "@/types/package";

interface DateItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific available date
export async function GET(req: NextRequest, { params }: DateItemParams) {
    try {
        const paramsData = await params;
        const dateId = paramsData.id;

        if (!dateId) {
            return createErrorResponse("Date ID is required", 400);
        }

        const date = await db.packageDate.findUnique({
            where: { id: dateId }
        });

        if (!date) {
            return createErrorResponse("Available date not found", 404);
        }

        return createSuccessResponse(date);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update an available date
export async function PUT(req: NextRequest, { params }: DateItemParams) {
    try {
        const paramsData = await params;
        const dateId = paramsData.id;

        if (!dateId) {
            return createErrorResponse("Date ID is required", 400);
        }

        // Parse request body
        const body: UpdateDateRequest = await req.json();

        // Check if date exists
        const existingDate = await db.packageDate.findUnique({
            where: { id: dateId },
            include: { package: { select: { id: true } } }
        });

        if (!existingDate) {
            return createErrorResponse("Available date not found", 404);
        }

        // Update data object
        const updateData: any = {};

        // Handle date update if provided
        if (body.date) {
            let parsedDate: Date;
            try {
                parsedDate = new Date(body.date);
                if (isNaN(parsedDate.getTime())) {
                    throw new Error('Invalid date');
                }

                // Ensure date is in the future
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (parsedDate < today) {
                    return createErrorResponse("Date must be in the future", 400);
                }

                // Check for date conflicts if changing date
                if (parsedDate.getTime() !== existingDate.date.getTime()) {
                    const dateConflict = await db.packageDate.findFirst({
                        where: {
                            packageId: existingDate.package.id,
                            date: parsedDate,
                            id: { not: dateId }
                        }
                    });

                    if (dateConflict) {
                        return createErrorResponse("This date is already available for this package", 400);
                    }
                }

                updateData.date = parsedDate;
            } catch (error) {
                return createErrorResponse("Invalid date format. Please use ISO format (YYYY-MM-DD)", 400);
            }
        }

        // Handle spots update if provided
        if (body.spots !== undefined) {
            if (body.spots < 0) {
                return createErrorResponse("Number of spots cannot be negative", 400);
            }
            updateData.spots = body.spots;
        }

        // Handle package ID update if provided
        if (body.packageId) {
            const packageExists = await db.masterPackage.findUnique({
                where: { id: body.packageId },
                select: { id: true }
            });

            if (!packageExists) {
                return createErrorResponse("Target package not found", 404);
            }

            updateData.packageId = body.packageId;
        }

        // Update date
        const updatedDate = await db.packageDate.update({
            where: { id: dateId },
            data: updateData
        });

        return createSuccessResponse(updatedDate, "Available date updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete an available date
export async function DELETE(req: NextRequest, { params }: DateItemParams) {
    try {
        const paramsData = await params;
        const dateId = paramsData.id;

        if (!dateId) {
            return createErrorResponse("Date ID is required", 400);
        }

        // Check if date exists
        const existingDate = await db.packageDate.findUnique({
            where: { id: dateId }
        });

        if (!existingDate) {
            return createErrorResponse("Available date not found", 404);
        }

        // Delete date
        await db.packageDate.delete({
            where: { id: dateId }
        });

        return createSuccessResponse(null, "Available date deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}