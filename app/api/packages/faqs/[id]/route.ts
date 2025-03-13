// app/api/packages/faqs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createErrorResponse, createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { UpdateFAQRequest } from "@/types/package";

interface FAQItemParams {
    params: {
        id: string;
    };
}

// GET - Fetch a specific FAQ
export async function GET(req: NextRequest, { params }: FAQItemParams) {
    try {
        const paramsData = await params;
        const faqId = paramsData.id;

        if (!faqId) {
            return createErrorResponse("FAQ ID is required", 400);
        }

        const faq = await db.packageFAQ.findUnique({
            where: { id: faqId }
        });

        if (!faq) {
            return createErrorResponse("FAQ not found", 404);
        }

        return createSuccessResponse(faq);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT - Update an FAQ
export async function PUT(req: NextRequest, { params }: FAQItemParams) {
    try {
        const paramsData = await params;
        const faqId = paramsData.id;

        if (!faqId) {
            return createErrorResponse("FAQ ID is required", 400);
        }

        // Parse request body
        const body: UpdateFAQRequest = await req.json();

        // Check if FAQ exists
        const existingFAQ = await db.packageFAQ.findUnique({
            where: { id: faqId }
        });

        if (!existingFAQ) {
            return createErrorResponse("FAQ not found", 404);
        }

        // Validate data
        if (body.question === '') {
            return createErrorResponse("Question cannot be empty", 400);
        }

        if (body.answer === '') {
            return createErrorResponse("Answer cannot be empty", 400);
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

        // Update FAQ
        const updatedFAQ = await db.packageFAQ.update({
            where: { id: faqId },
            data: {
                ...(body.question !== undefined && { question: body.question }),
                ...(body.answer !== undefined && { answer: body.answer }),
                ...(body.packageId && { packageId: body.packageId })
            }
        });

        return createSuccessResponse(updatedFAQ, "FAQ updated successfully");
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE - Delete an FAQ
export async function DELETE(req: NextRequest, { params }: FAQItemParams) {
    try {
        const paramsData = await params;
        const faqId = paramsData.id;

        if (!faqId) {
            return createErrorResponse("FAQ ID is required", 400);
        }

        // Check if FAQ exists
        const existingFAQ = await db.packageFAQ.findUnique({
            where: { id: faqId }
        });

        if (!existingFAQ) {
            return createErrorResponse("FAQ not found", 404);
        }

        // Delete FAQ
        await db.packageFAQ.delete({
            where: { id: faqId }
        });

        return createSuccessResponse(null, "FAQ deleted successfully");
    } catch (error) {
        return handleApiError(error);
    }
}