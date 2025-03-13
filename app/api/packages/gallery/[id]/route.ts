// app/api/packages/gallery/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateGalleryRequest } from "@/types/package";

interface GalleryImageParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific gallery image
export async function GET(req: NextRequest, { params }: GalleryImageParams) {
    try {
        const paramsData = await params;
        const imageId = paramsData.id;

        if (!imageId) {
            return createErrorResponse("Image ID is required", 400);
        }

        const image = await db.packageGallery.findUnique({
            where: { id: imageId }
        });

        if (!image) {
            return createErrorResponse("Gallery image not found", 404);
        }

        return createSuccessResponse(image);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update a gallery image
export async function PUT(req: NextRequest, { params }: GalleryImageParams) {
    try {
        const paramsData = await params;
        const imageId = paramsData.id;

        if (!imageId) {
            return createErrorResponse("Image ID is required", 400);
        }

        // Parse request body
        const body: UpdateGalleryRequest = await req.json();

        // Check if image exists
        const existingImage = await db.packageGallery.findUnique({
            where: { id: imageId }
        });

        if (!existingImage) {
            return createErrorResponse("Gallery image not found", 404);
        }

        // Validate data
        if (body.imageUrl === '') {
            return createErrorResponse("Image URL cannot be empty", 400);
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

        // Update gallery image
        const updatedImage = await db.packageGallery.update({
            where: { id: imageId },
            data: {
                ...(body.imageUrl && { imageUrl: body.imageUrl }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedImage, "Gallery image updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete a gallery image
export async function DELETE(req: NextRequest, { params }: GalleryImageParams) {
    try {
        const paramsData = await params;
        const imageId = paramsData.id;

        if (!imageId) {
            return createErrorResponse("Image ID is required", 400);
        }

        // Check if image exists
        const existingImage = await db.packageGallery.findUnique({
            where: { id: imageId }
        });

        if (!existingImage) {
            return createErrorResponse("Gallery image not found", 404);
        }

        // Delete gallery image
        await db.packageGallery.delete({
            where: { id: imageId }
        });

        return createSuccessResponse(null, "Gallery image deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}