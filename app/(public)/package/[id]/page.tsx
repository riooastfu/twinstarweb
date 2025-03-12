// app/package/[id]/page.tsx
import PackageDetailComponent from '@/components/package/package-detail';
import { db } from '@/lib/db';
import { Metadata } from 'next';
import React from 'react';

interface PackageProps {
    params: {
        id: string;
    };
}

// Generate dynamic metadata for each package
export async function generateMetadata(
    { params }: PackageProps
): Promise<Metadata> {
    // Fetch the package data
    try {
        const packageData = await db.masterPackage.findUnique({
            where: {
                id: params.id
            }
        });

        // If package not found, return default metadata
        if (!packageData) {
            return {
                title: 'Package Not Found | Twin Star Tour & Travel',
                description: 'The requested tour package could not be found.'
            };
        }

        // Format the price for meta description
        const formattedPrice = packageData.price.toLocaleString('id-ID');

        // Return dynamic metadata based on the package
        return {
            title: `${packageData.packageTitle} | Twin Star Tour & Travel`,
            description: `${packageData.description.substring(0, 150)}... Duration: ${packageData.duration}. Book now from IDR ${formattedPrice} per person.`,
            openGraph: {
                title: packageData.packageTitle,
                description: `${packageData.description.substring(0, 200)}...`,
                url: `https://twinstar.com/package/${params.id}`,
                siteName: 'Twin Star Tour & Travel',
                images: [
                    {
                        url: packageData.image,
                        width: 1200,
                        height: 630,
                        alt: packageData.packageTitle,
                    },
                ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: packageData.packageTitle,
                description: `${packageData.description.substring(0, 200)}...`,
                images: [packageData.image],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);

        // Return fallback metadata
        return {
            title: 'Tour Package | Twin Star Tour & Travel',
            description: 'Explore our premium tour packages and book your dream vacation today.'
        };
    }
}

const PackagePageId = async ({ params }: PackageProps) => {
    const packageParam = await params;
    return (
        <main>
            <PackageDetailComponent params={packageParam} />
        </main>
    );
};

export default PackagePageId;