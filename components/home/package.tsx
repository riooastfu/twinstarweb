"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PackageTourProps {
    id: number;
    package_title: string;
    duration: string;
    price: number;
    description: string;
    image: string;
}

const packageTour: PackageTourProps[] = [
    {
        id: 1,
        package_title: "North Sumatera",
        duration: "7D6N",
        price: 3850000,
        description: "Explore the natural beauty of North Sumatera, from the majestic Lake Toba to the cultural heritage of Medan and Berastagi.",
        image: '/img/bghero.jpg'
    },
    {
        id: 2,
        package_title: "Bali Paradise",
        duration: "5D4N",
        price: 4500000,
        description: "Experience the stunning beaches, vibrant nightlife, and rich culture of Bali with visits to Ubud, Uluwatu, and Seminyak.",
        image: '/img/bghero.jpg'
    },
    {
        id: 3,
        package_title: "Yogyakarta Heritage",
        duration: "4D3N",
        price: 3200000,
        description: "Discover the rich history of Yogyakarta with visits to Borobudur, Prambanan, and the Sultan's Palace.",
        image: '/img/bghero.jpg'
    },
    {
        id: 4,
        package_title: "Raja Ampat Adventure",
        duration: "6D5N",
        price: 8500000,
        description: "Dive into the pristine waters of Raja Ampat, home to some of the world's most stunning marine biodiversity.",
        image: '/img/bghero.jpg'
    },
    {
        id: 5,
        package_title: "Jakarta City Tour",
        duration: "3D2N",
        price: 2100000,
        description: "Explore the bustling capital city with visits to historical landmarks, shopping districts, and culinary hotspots.",
        image: '/img/bghero.jpg'
    },
    {
        id: 6,
        package_title: "Lombok Island Getaway",
        duration: "5D4N",
        price: 4000000,
        description: "Relax on the beautiful beaches of Lombok, explore the Gili Islands, and trek to the breathtaking Sendang Gile waterfall.",
        image: '/img/bghero.jpg'
    },
    {
        id: 7,
        package_title: "Komodo Island Expedition",
        duration: "4D3N",
        price: 7000000,
        description: "Meet the legendary Komodo dragons and enjoy snorkeling in the crystal-clear waters of Komodo National Park.",
        image: '/img/bghero.jpg'
    },
    {
        id: 8,
        package_title: "Bromo Sunrise Tour",
        duration: "2D1N",
        price: 1500000,
        description: "Witness the magical sunrise over Mount Bromo and explore the surreal landscapes of East Java.",
        image: '/img/bghero.jpg'
    },
    {
        id: 9,
        package_title: "Toraja Cultural Journey",
        duration: "5D4N",
        price: 4800000,
        description: "Immerse yourself in the unique traditions of the Toraja people, famous for their elaborate funeral ceremonies and traditional houses.",
        image: '/img/bghero.jpg'
    },
    {
        id: 10,
        package_title: "Labuan Bajo Escape",
        duration: "4D3N",
        price: 6800000,
        description: "Explore the gateway to Komodo National Park, enjoy stunning ocean views, and experience island hopping adventures.",
        image: '/img/bghero.jpg'
    },
    {
        id: 11,
        package_title: "Belitung Island Relaxation",
        duration: "3D2N",
        price: 2500000,
        description: "Unwind on the pristine beaches of Belitung, known for its granite rock formations and crystal-clear waters.",
        image: '/img/bghero.jpg'
    },
    {
        id: 12,
        package_title: "Derawan Island Diving",
        duration: "6D5N",
        price: 7500000,
        description: "Discover the underwater paradise of Derawan Islands, home to sea turtles, manta rays, and stunning coral reefs.",
        image: '/img/bghero.jpg'
    },
    {
        id: 13,
        package_title: "Tana Toraja Experience",
        duration: "4D3N",
        price: 4500000,
        description: "Visit the land of the Toraja people, known for its unique culture, traditional houses, and breathtaking mountain views.",
        image: '/img/bghero.jpg'
    },
    {
        id: 14,
        package_title: "Wakatobi Snorkeling",
        duration: "5D4N",
        price: 6200000,
        description: "Snorkel in one of the most pristine marine parks in Indonesia, with vibrant coral reefs and diverse marine life.",
        image: '/img/bghero.jpg'
    },
    {
        id: 15,
        package_title: "Sumba Island Adventure",
        duration: "6D5N",
        price: 5300000,
        description: "Explore the rugged beauty of Sumba Island, with its stunning waterfalls, traditional villages, and untouched beaches.",
        image: '/img/bghero.jpg'
    }
];

const ITEMS_PER_PAGE = 6;

const PackageComponent = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(packageTour.length / ITEMS_PER_PAGE);
    const displayedItems = packageTour.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goTo = (link: string) => {
        router.push(link)
    };

    return (
        <div className="container flex flex-col gap-y-6 mx-auto p-6">
            <h1 className='text-2xl font-bold'>Tour Package</h1>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayedItems.map((item) => (
                    <Card
                        key={item.id}
                        className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-square">
                            <Image
                                src={item.image}
                                alt={`Image ${item.package_title}`}
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>

                        {/* Card Content */}
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-800">
                                {item.package_title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4">
                            <p className="text-gray-600">{item.description}</p>
                            <p className="mt-2 font-semibold text-lg text-blue-600">
                                IDR {item.price.toLocaleString('id-ID')}
                            </p>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="p-4 flex justify-between items-center">
                            <Button onClick={() => goTo(`/package/${item.id}`)} className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2">
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
                <Pagination>
                    <PaginationContent className="flex space-x-2">
                        {/* Previous Button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                                <ChevronLeft />
                            </Button>
                        </PaginationItem>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next Button */}
                        <PaginationItem>
                            <Button
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                <ChevronRight />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default PackageComponent;
