"use client"

import React, { useRef, useState } from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define category enum
enum AttractionCategory {
    ATTRACTION = "Atraksi",
    HOTEL = "Hotel",
    VILLA_APARTMENT = "Vila & Apt.",
    EVENT = "Event",
    PLAYGROUND = "Tempat bermain",
    TOUR = "Tur",
    SPA_BEAUTY = "Spa & Kecantikan"
}

interface Attraction {
    id: string;
    name: string;
    location: string;
    price: number;
    imageUrl: string;
    category: AttractionCategory;
}

// Sample data with enum categories
const allAttractions: Attraction[] = [
    {
        id: "1",
        name: "Enchanting Valley Bogor",
        location: "Cisarua, Bogor",
        price: 118800,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.ATTRACTION
    },
    {
        id: "2",
        name: "The Great Asia Africa",
        location: "Lembang, Bandung",
        price: 44000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.ATTRACTION
    },
    {
        id: "3",
        name: "Pondok Indah Waterpark",
        location: "Kebayoran Lama, Jakarta Selatan",
        price: 110000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.PLAYGROUND
    },
    {
        id: "4",
        name: "Playtopia Sports Gokart",
        location: "Kelapa Gading, Jakarta Utara",
        price: 128250,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.PLAYGROUND
    },
    {
        id: "5",
        name: "Waterboom Lippo Cikarang",
        location: "Cikarang Selatan, Cikarang",
        price: 35000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.PLAYGROUND
    },
    {
        id: "6",
        name: "Grand Hyatt Jakarta",
        location: "Jakarta Pusat",
        price: 2000000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.HOTEL
    },
    {
        id: "7",
        name: "Villa Puncak View",
        location: "Puncak, Bogor",
        price: 950000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.VILLA_APARTMENT
    },
    {
        id: "8",
        name: "Jakarta Jazz Festival",
        location: "Jakarta Convention Center",
        price: 750000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.EVENT
    },
    {
        id: "9",
        name: "Bali Tour Package",
        location: "Bali",
        price: 4250000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.TOUR
    },
    {
        id: "10",
        name: "Luxury Spa Treatment",
        location: "Jakarta Selatan",
        price: 1200000,
        imageUrl: "/img/bghero.jpg",
        category: AttractionCategory.SPA_BEAUTY
    }
];

// Get all category values from enum for buttons
const categoryButtons = Object.values(AttractionCategory);

const CarRentalComponent = () => {
    // State for active category, using enum value
    const [activeCategory, setActiveCategory] = useState<AttractionCategory>(AttractionCategory.ATTRACTION);

    // Filter attractions based on active category
    const filteredAttractions = allAttractions.filter(
        attraction => attraction.category === activeCategory
    );

    // Refs for scrolling
    const attractionsScrollRef = useRef<HTMLDivElement>(null);

    // Scroll functions - adjusted scroll amount for different screen sizes
    const scrollLeft = () => {
        if (attractionsScrollRef.current) {
            const scrollAmount = window.innerWidth < 640 ? -150 : -300;
            attractionsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (attractionsScrollRef.current) {
            const scrollAmount = window.innerWidth < 640 ? 150 : 300;
            attractionsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-3 sm:p-4">
            <h1 className='text-xl sm:text-2xl font-bold'>Other Services</h1>

            {/* Category buttons using enum values - smaller text and padding on mobile */}
            <ScrollArea className="w-full whitespace-nowrap rounded-md mb-4 sm:mb-6">
                <div className="flex w-max space-x-2 sm:space-x-4 p-1">
                    {categoryButtons.map((category) => (
                        <Button
                            key={category}
                            variant={category === activeCategory ? "default" : "outline"}
                            className="rounded-full text-xs sm:text-sm py-1 px-2 sm:px-4 h-auto"
                            onClick={() => setActiveCategory(category as AttractionCategory)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Attractions carousel with navigation arrows - responsive sizing */}
            <div className="relative">
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 shadow-md hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
                    onClick={scrollLeft}
                >
                    <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </Button>

                <ScrollArea className="w-full px-6 whitespace-nowrap rounded-md">
                    <div ref={attractionsScrollRef} className="flex w-max space-x-3 sm:space-x-4 p-1">
                        {filteredAttractions.length > 0 ? (
                            filteredAttractions.map((attraction) => (
                                <Card key={attraction.id} className="w-56 sm:w-64 md:w-72 shadow-md flex-shrink-0">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <img
                                                src={attraction.imageUrl}
                                                alt={attraction.name}
                                                className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-t-lg"
                                            />
                                        </div>
                                        <div className="p-3 sm:p-4">
                                            <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate">{attraction.name}</h3>
                                            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4">{attraction.location}</p>
                                            <p className="text-red-500 font-semibold text-sm sm:text-base">
                                                IDR {attraction.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="w-full py-6 sm:py-8 text-center text-gray-500">
                                No attractions found in this category.
                            </div>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 shadow-md hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
                    onClick={scrollRight}
                >
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                </Button>
            </div>
        </div>
    );
}

export default CarRentalComponent