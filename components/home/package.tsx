"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PackageTourProps {
    id: number;
    packageTitle: string;
    duration: string;
    price: number;
    description: string;
    image: string;
}

// Adaptive items per page based on screen size
const getItemsPerPage = () => {
    // Default for mobile (will be used for SSR initial render)
    let itemsPerPage = 3;

    // Only run on client side
    if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1280) itemsPerPage = 6; // xl screens
        else if (width >= 1024) itemsPerPage = 6; // lg screens
        else if (width >= 768) itemsPerPage = 4; // md screens
        else if (width >= 640) itemsPerPage = 4; // sm screens
        else itemsPerPage = 3; // xs screens
    }

    return itemsPerPage;
};

const PackageComponent = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [packageTour, setPackageTour] = useState<PackageTourProps[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());

    const getPackage = async () => {
        try {
            const response = await fetch("/api/packages");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched packages:", data);

            setPackageTour(data.data.packages)
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching packages:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    }

    // Update items per page on resize
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(packageTour.length / itemsPerPage);
    const displayedItems = packageTour.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goTo = (link: string) => {
        router.push(link)
    };

    useEffect(() => {
        getPackage();
    }, [])

    return (
        <div id='package_section' className="container flex flex-col gap-y-6 mx-auto p-4 sm:p-6">
            <h1 className='text-xl sm:text-2xl font-bold'>Tour Package</h1>

            {/* Grid Layout - responsive columns for all device sizes */}
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayedItems.map((item) => (
                    <Card
                        key={item.id}
                        className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        {/* Image with responsive aspect ratio */}
                        <div className="relative w-full aspect-[4/3] xs:aspect-square">
                            <Image
                                src={item.image}
                                alt={`Image ${item.packageTitle}`}
                                fill
                                className="object-cover rounded-t-xl"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                        </div>

                        {/* Card Content */}
                        <CardHeader className="p-3 sm:p-4">
                            <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                                {item.packageTitle}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-3 sm:p-4">
                            <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                            <p className="mt-2 font-semibold text-base sm:text-lg text-blue-600">
                                IDR {item.price.toLocaleString('id-ID')}
                            </p>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="p-3 sm:p-4 flex justify-between items-center">
                            <Button
                                onClick={() => goTo(`/package/${item.id}`)}
                                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-1 sm:py-2 text-sm"
                            >
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination - simplified for mobile */}
            <div className="mt-6 sm:mt-8 flex justify-center">
                <Pagination>
                    <PaginationContent className="flex space-x-1 sm:space-x-2">
                        {/* Previous Button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="h-8 w-8 sm:h-10 sm:w-10"
                            >
                                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </PaginationItem>

                        {/* Page Numbers - show fewer on mobile */}
                        {[...Array(totalPages)].map((_, i) => {
                            // On mobile, only show current, prev, next
                            if (window.innerWidth < 640 &&
                                i !== 0 &&
                                i !== totalPages - 1 &&
                                i !== currentPage - 1 &&
                                Math.abs(i - (currentPage - 1)) > 1) {
                                return null;
                            }

                            return (
                                <PaginationItem key={i} className={`${Math.abs(i - (currentPage - 1)) > 2 && window.innerWidth < 768 ? 'hidden' : ''}`}>
                                    <PaginationLink
                                        isActive={currentPage === i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className="h-8 w-8 sm:h-10 sm:w-10"
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        {/* Next Button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="h-8 w-8 sm:h-10 sm:w-10"
                            >
                                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default PackageComponent;