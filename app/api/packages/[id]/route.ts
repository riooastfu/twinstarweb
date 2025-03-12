// app/api/packages/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface PackageParams {
    params: {
        id: string;
    };
}

export async function GET(req: Request, { params }: PackageParams) {
    try {
        // Need to await params before accessing its properties
        const paramsData = await params;
        const packageId = paramsData.id;

        if (!packageId) {
            return new NextResponse("Package ID is required", { status: 400 });
        }

        const packageData = await db.masterPackage.findUnique({
            where: {
                id: packageId
            }
        });

        if (!packageData) {
            return new NextResponse("Package not found", { status: 404 });
        }

        return NextResponse.json(packageData);
    } catch (error) {
        console.log("[PACKAGE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}