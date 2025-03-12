"use client"

import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedTestimonials } from '../ui/animated-testimonials';
import { Button } from '../ui/button';
import Link from 'next/link';

const images = [
    "/img/bghero.jpg",
    "/img/bghero2.jpg",
    "/img/bghero3.jpg",
]

const testimonials = [
    {
        quote:
            "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
        name: "Sarah Chen",
        designation: "Product Manager at TechFlow",
        src: "/img/card/card(1).jpg",
    },
    {
        quote:
            "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
        name: "Michael Rodriguez",
        designation: "CTO at InnovateSphere",
        src: "/img/card/card(2).jpg",
    },
    {
        quote:
            "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
        name: "Emily Watson",
        designation: "Operations Director at CloudScale",
        src: "/img/card/card(3).jpg",
    },
    {
        quote:
            "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
        name: "James Kim",
        designation: "Engineering Lead at DataPro",
        src: "/img/card/card(4).jpg",
    },
    {
        quote:
            "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
        name: "Lisa Thompson",
        designation: "VP of Technology at FutureNet",
        src: "/img/card/card(5).jpg",
    },
];

const HomeComponent = () => {
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Handle scroll events
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mounted) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [mounted, images.length]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Calculate parallax transforms - reduce effect for better performance
    const headerTransform = `translateY(${scrollY * 0.15}px)`;
    const imageTransform = `translateY(${scrollY * 0.1}px)`;
    const overlayOpacity = Math.min(scrollY / 500, 0.7);

    return (
        <div className="relative w-full min-h-[500px] h-[100svh] overflow-hidden">
            {mounted && (
                <>
                    {/* Background Images */}
                    {images.map((image, index) => (
                        <div
                            key={image}
                            className="absolute inset-0 w-full h-full transition-opacity duration-1000"
                            style={{
                                transform: imageTransform,
                                opacity: currentImageIndex === index ? 1 : 0,
                                backgroundImage: `url("${image}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                zIndex: currentImageIndex === index ? 1 : 0,
                            }}
                        />
                    ))}

                    {/* Overlay gradient */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10"
                        style={{ opacity: Math.max(0.6, overlayOpacity) }}
                    />

                    {/* Slider controls - hidden on small screens */}
                    <div className="absolute inset-x-0 top-1/2 flex justify-between px-4 z-30 hidden sm:flex">
                        <button
                            onClick={previousImage}
                            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === index
                                        ? 'bg-white w-4 sm:w-6'
                                        : 'bg-white/50 hover:bg-white/75 w-2'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Content container */}
                    <div className="relative h-full flex items-center justify-center p-4 z-20">
                        <div
                            className="bg-black/30 backdrop-blur-sm rounded-xl border-none w-full max-w-4xl overflow-hidden"
                            style={{ transform: headerTransform }}
                        >
                            {/* Content layout with flexible padding */}
                            <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4">
                                {/* Testimonials component */}
                                <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

                                {/* Main content with appropriate spacing */}
                                <div className="pt-2 sm:pt-4">
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                                        Discover Amazing Things
                                    </h1>

                                    <p className="text-sm sm:text-base md:text-lg text-gray-200 my-3 sm:my-4 max-w-2xl">
                                        Twin Star Tour & Travel provides a choice of tour package for Domestic & Overseas.
                                    </p>

                                    <Button variant="default" className="w-full sm:w-auto text-sm sm:text-base mt-2">
                                        <Link href="#package_section" className="w-full text-center">
                                            Let's Tour
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomeComponent