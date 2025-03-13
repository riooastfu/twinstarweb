// app/api/packages/route.ts - GET all packages, POST new package
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreatePackageRequest } from "@/types/package";

// GET - Fetch all packages
export async function GET(req: NextRequest) {
    try {
        // Parse query parameters
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
        const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;
        const orderBy = searchParams.get('orderBy') || 'packageTitle';
        const orderDir = searchParams.get('orderDir') || 'asc';

        // Validate ordering parameters
        const validOrderByFields = ['packageTitle', 'price', 'duration', 'id'];
        const validOrderDirections = ['asc', 'desc'];

        if (!validOrderByFields.includes(orderBy)) {
            return createErrorResponse(`Invalid orderBy parameter. Must be one of: ${validOrderByFields.join(', ')}`, 400);
        }

        if (!validOrderDirections.includes(orderDir)) {
            return createErrorResponse(`Invalid orderDir parameter. Must be one of: ${validOrderDirections.join(', ')}`, 400);
        }

        // Build query
        const packages = await db.masterPackage.findMany({
            ...(limit !== undefined && { take: limit }),
            ...(offset !== undefined && { skip: offset }),
            orderBy: {
                [orderBy]: orderDir
            },
            include: {
                _count: {
                    select: {
                        gallery: true,
                        reviews: true
                    }
                }
            }
        });

        // Get total count for pagination
        const totalCount = await db.masterPackage.count();

        return createSuccessResponse({
            packages,
            meta: {
                total: totalCount,
                limit,
                offset,
                orderBy,
                orderDir
            }
        });
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Create a new package
export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const body: CreatePackageRequest = await req.json();

        // Validate required fields
        const requiredFields = ['packageTitle', 'duration', 'price', 'description', 'image'];
        const missingFields = requiredFields.filter(field => !(field in body));

        if (missingFields.length > 0) {
            return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
        }

        // Validate data types
        if (typeof body.price !== 'number' || body.price <= 0) {
            return createErrorResponse('Price must be a positive number', 400);
        }

        // Create package
        const newPackage = await db.masterPackage.create({
            data: {
                packageTitle: body.packageTitle,
                duration: body.duration,
                price: body.price,
                description: body.description,
                image: body.image,
                location: body.location,
                minGroupSize: body.minGroupSize || 2,
                maxGroupSize: body.maxGroupSize || 15
            }
        });

        return createSuccessResponse(newPackage, 'Package created successfully', 201);
    } catch (error) {
        return handleApiError(error);
    }
}