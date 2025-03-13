// app/api/packages/[packageId]/faqs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { CreateFAQRequest } from "@/types/package";

interface FAQParams {
    params: {
        packageId: string;
    };
}

// GET - Fetch all FAQs for a package
export async function GET(req: NextRequest, { params }: FAQParams) {
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

        // Fetch FAQs
        const faqs = await db.packageFAQ.findMany({
            where: { packageId }
        });

        return createSuccessResponse(faqs);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST - Add a new FAQ
export async function POST(req: NextRequest, { params }: FAQParams) {
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
        const body: CreateFAQRequest = await req.json();

        // Validate required fields
        const requiredFields = ['question', 'answer'];
        const missingFields = requiredFields.filter(field => !(field in body));

        if (missingFields.length > 0) {
            return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
        }

        // Create FAQ
        const newFAQ = await db.packageFAQ.create({
            data: {
                question: body.question,
                answer: body.answer,
                packageId
            }
        });

        return createSuccessResponse(newFAQ, "FAQ added successfully", 201);
    } catch (error) {
        return handleApiError(error);
    }
}