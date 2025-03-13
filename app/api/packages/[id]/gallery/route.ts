// app/api/packages/[packageId]/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateGalleryRequest } from "@/types/package";

interface GalleryParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all gallery images for a package
export async function GET(req: NextRequest, { params }: GalleryParams) {
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

        // Fetch gallery images
        const galleryImages = await db.packageGallery.findMany({
            where: { packageId }
        });

        return createSuccessResponse(galleryImages);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new gallery image
export async function POST(req: NextRequest, { params }: GalleryParams) {
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
        const body: CreateGalleryRequest = await req.json();

        // Validate required fields
        if (!body.imageUrl) {
            return createErrorResponse("Image URL is required", 400);
        }

        // Create gallery image
        const newImage = await db.packageGallery.create({
            data: {
                imageUrl: body.imageUrl,
                packageId
            }
        });

        return createSuccessResponse(newImage, "Gallery image added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}