"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

// Interface that matches your MasterPackage schema
interface PackageTourProps {
    id: string;
    packageTitle: string;
    duration: string;
    price: number;
    description: string;
    image: string;
}

const PackageComponent = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [packageTour, setPackageTour] = useState<PackageTourProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(3); // Default for mobile

    // Fetch packages from API
    const fetchPackages = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/packages");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched packages:", data);

            setPackageTour(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching packages:", error.message);
                setError(error.message);
            } else {
                console.error("An unknown error occurred");
                setError("Unknown error occurred");
            }
            setLoading(false);
        }
    };

    // Function to get items per page based on screen size
    const updateItemsPerPage = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            let newItemsPerPage = 3; // Default for xs screens

            if (width >= 1280) newItemsPerPage = 9; // xl screens - Increased for better presentation
            else if (width >= 1024) newItemsPerPage = 6; // lg screens
            else if (width >= 768) newItemsPerPage = 4; // md screens
            else if (width >= 640) newItemsPerPage = 4; // sm screens

            setItemsPerPage(newItemsPerPage);
            setIsMobile(width < 640);

            // Update total pages when items per page changes
            if (packageTour.length > 0) {
                setTotalPages(Math.ceil(packageTour.length / newItemsPerPage));
            }
        }
    };

    // Initialize component and check for window object
    useEffect(() => {
        updateItemsPerPage();
        // Add resize listener only on client
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateItemsPerPage);
            return () => window.removeEventListener('resize', updateItemsPerPage);
        }
    }, []);

    // Fetch packages on component mount
    useEffect(() => {
        fetchPackages();
    }, []);

    // Update total pages when packageTour or itemsPerPage changes
    useEffect(() => {
        if (packageTour.length > 0) {
            setTotalPages(Math.ceil(packageTour.length / itemsPerPage));
        }
    }, [packageTour, itemsPerPage]);

    // Get displayed items for current page
    const displayedItems = packageTour.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of package section
        const packageSection = document.getElementById('package_section');
        if (packageSection) {
            packageSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Pagination renderer that doesn't depend on window during render
    const renderPagination = () => {
        // Only show limited pages on mobile
        const renderPageNumbers = () => {
            return Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;

                // On mobile, simplify the pagination
                if (isMobile) {
                    if (totalPages <= 5) {
                        // Show all pages if 5 or fewer
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    isActive={currentPage === pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className="h-8 w-8"
                                    aria-label={`Go to page ${pageNumber}`}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    } else {
                        // Show limited pages with ellipsis on mobile
                        if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        isActive={currentPage === pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className="h-8 w-8"
                                        aria-label={`Go to page ${pageNumber}`}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        } else if (pageNumber === 2 && currentPage > 3) {
                            return <span key="ellipsis-start" className="px-2" aria-hidden="true">...</span>;
                        } else if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                            return <span key="ellipsis-end" className="px-2" aria-hidden="true">...</span>;
                        }
                        return null;
                    }
                }

                // Desktop pagination
                return (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            isActive={currentPage === pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className="h-8 w-8 sm:h-10 sm:w-10"
                            aria-label={`Go to page ${pageNumber}`}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                );
            });
        };

        return (
            <nav aria-label="Pagination navigation">
                <Pagination>
                    <PaginationContent className="flex space-x-1 sm:space-x-2">
                        {/* Previous Button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                className="h-8 w-8 sm:h-10 sm:w-10"
                                aria-label="Go to previous page"
                            >
                                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </PaginationItem>

                        {/* Page Numbers */}
                        {renderPageNumbers()}

                        {/* Next Button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                className="h-8 w-8 sm:h-10 sm:w-10"
                                aria-label="Go to next page"
                            >
                                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </nav>
        );
    };

    return (
        <div className="bg-gray-50 py-12">
            {/* SEO-friendly header section */}
            <section className="mb-12 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Explore Our Tour Packages
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover our carefully curated selection of premium travel experiences. Whether you're looking for adventure, relaxation, or cultural immersion, our tour packages offer unforgettable journeys.
                    </p>
                </div>
            </section>

            <div id='package_section' className="container flex flex-col gap-y-8 mx-auto px-4 sm:px-6">
                {/* Breadcrumbs for SEO */}
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex text-sm text-gray-600">
                        <li className="flex items-center">
                            <Link href="/" className="hover:text-orange-600">Home</Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="font-semibold text-gray-900">Tour Packages</li>
                    </ol>
                </nav>

                {/* Package count and sorting options */}
                {!loading && !error && packageTour.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <p className="text-gray-600 mb-4 sm:mb-0">
                            Showing <span className="font-medium">{displayedItems.length}</span> of <span className="font-medium">{packageTour.length}</span> available packages
                        </p>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                            <select
                                id="sort"
                                className="border border-gray-300 rounded-md text-sm py-1 px-2"
                                aria-label="Sort packages by"
                            >
                                <option value="popular">Popularity</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                                <option value="duration">Duration</option>
                            </select>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                        <span className="ml-3 text-gray-600 text-lg">Loading tour packages...</span>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-2">Unable to Load Packages</h2>
                        <p className="mb-4">We're having trouble loading our tour packages: {error}</p>
                        <Button
                            onClick={fetchPackages}
                            variant="outline"
                            className="mt-2"
                        >
                            Try Again
                        </Button>
                    </div>
                ) : displayedItems.length === 0 ? (
                    <div className="bg-orange-50 text-orange-700 p-12 rounded-lg text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-3">No Tour Packages Available</h2>
                        <p className="text-lg">Our team is working on creating new exciting tour packages. Please check back soon for updates.</p>
                    </div>
                ) : (
                    <>
                        {/* Grid Layout - responsive columns for all device sizes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {displayedItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="group h-full flex flex-col"
                                >
                                    <Card
                                        className="overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl h-full flex flex-col"
                                    >
                                        {/* Image with responsive aspect ratio */}
                                        <div className="relative w-full aspect-[4/3] xs:aspect-[3/2] overflow-hidden">
                                            <Link href={`/package/${item.id}`}>
                                                <Image
                                                    src={item.image}
                                                    alt={`View ${item.packageTitle} tour package`}
                                                    fill
                                                    className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                                    priority={currentPage === 1 && displayedItems.indexOf(item) < 3}
                                                />
                                            </Link>
                                            {/* Duration badge */}
                                            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {item.duration}
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <CardHeader className="p-4 pb-2">
                                            <Link href={`/package/${item.id}`} className="group-hover:text-orange-600 transition-colors">
                                                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
                                                    {item.packageTitle}
                                                </CardTitle>
                                            </Link>
                                        </CardHeader>

                                        <CardContent className="p-4 pt-0 pb-2 flex-grow">
                                            {/* Package info badges */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    Indonesia
                                                </span>
                                                <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                                    <Users className="h-3 w-3 mr-1" />
                                                    2-15 people
                                                </span>
                                            </div>

                                            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                                {item.description}
                                            </p>

                                            <div className="mt-auto pt-2">
                                                <p className="text-gray-500 text-xs">Starting from</p>
                                                <p className="font-bold text-xl text-orange-600">
                                                    IDR {item.price.toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-gray-500 text-xs">per person</p>
                                            </div>
                                        </CardContent>

                                        {/* Footer */}
                                        <CardFooter className="p-4 pt-2">
                                            <Link href={`/package/${item.id}`} className="w-full">
                                                <Button
                                                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-full py-2 text-sm"
                                                >
                                                    View Package Details
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </article>
                            ))}
                        </div>

                        {/* Pagination - simplified for mobile */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                {renderPagination()}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PackageComponent;