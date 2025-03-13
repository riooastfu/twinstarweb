// app/api/packages/[id]/route.ts - GET, PUT, DELETE for single package
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdatePackageRequest } from "@/types/package";

interface PackageParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific package by ID
export async function GET(req: NextRequest, { params }: PackageParams) {
    try {
        // Await params to avoid Next.js error
        const paramsData = await params;
        const packageId = paramsData.id;

        if (!packageId) {
            return createErrorResponse("Package ID is required", 400);
        }

        // Find package with all related data
        const packageData = await db.masterPackage.findUnique({
            where: {
                id: packageId
            },
            include: {
                gallery: true,
                highlights: true,
                itinerary: {
                    include: {
                        activities: true,
                        meals: true
                    },
                    orderBy: {
                        day: 'asc'
                    }
                },
                inclusions: true,
                exclusions: true,
                availableDates: true,
                reviews: {
                    orderBy: {
                        date: 'desc'
                    }
                },
                faqs: true
            }
        });

        if (!packageData) {
            return createErrorResponse("Package not found", 404);
        }

        return createSuccessResponse(packageData);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update a package
export async function PUT(req: NextRequest, { params }: PackageParams) {
    try {
        // Await params to avoid Next.js error
        const paramsData = await params;
        const packageId = paramsData.id;

        if (!packageId) {
            return createErrorResponse("Package ID is required", 400);
        }

        // Parse request body
        const body: UpdatePackageRequest = await req.json();

        // Check if package exists
        const existingPackage = await db.masterPackage.findUnique({
            where: { id: packageId }
        });

        if (!existingPackage) {
            return createErrorResponse("Package not found", 404);
        }

        // Validate data if provided
        if (body.price !== undefined && (typeof body.price !== 'number' || body.price <= 0)) {
            return createErrorResponse('Price must be a positive number', 400);
        }

        // Update package
        const updatedPackage = await db.masterPackage.update({
            where: { id: packageId },
            data: {
                ...(body.packageTitle !== undefined && { packageTitle: body.packageTitle }),
                ...(body.duration !== undefined && { duration: body.duration }),
                ...(body.price !== undefined && { price: body.price }),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.image !== undefined && { image: body.image }),
                ...(body.location !== undefined && { location: body.location }),
                ...(body.minGroupSize !== undefined && { minGroupSize: body.minGroupSize }),
                ...(body.maxGroupSize !== undefined && { maxGroupSize: body.maxGroupSize })
            }
        });

        return createSuccessResponse(updatedPackage, 'Package updated successfully');
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete a package
export async function DELETE(req: NextRequest, { params }: PackageParams) {
    try {
        // Await params to avoid Next.js error
        const paramsData = await params;
        const packageId = paramsData.id;

        if (!packageId) {
            return createErrorResponse("Package ID is required", 400);
        }

        // Check if package exists
        const existingPackage = await db.masterPackage.findUnique({
            where: { id: packageId }
        });

        if (!existingPackage) {
            return createErrorResponse("Package not found", 404);
        }

        // Delete package (this will cascade delete all related records if set up in the schema)
        await db.masterPackage.delete({
            where: { id: packageId }
        });

        return createSuccessResponse(null, 'Package deleted successfully');
    } catch (error) {
        return handleApiError(error);
    }
}