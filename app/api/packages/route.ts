import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const packages = await db.masterPackage.findMany({
            orderBy: {
                packageTitle: 'asc'
            }
        });

        return NextResponse.json(packages);
    } catch (error) {
        console.log("[PACKAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { package_title, duration, price, description, image } = await req.json();

        const masterPackage = await db.masterPackage.create({
            data: {
                packageTitle: package_title,
                duration: duration,
                price: price,
                description: description,
                image: image
            }
        });

        return NextResponse.json(masterPackage);

    } catch (error) {
        console.log("[PACKAGES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}