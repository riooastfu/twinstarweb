"use client"

import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedTestimonials } from '../ui/animated-testimonials';
import { Button } from '../ui/button';


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

    // Calculate parallax transforms
    const headerTransform = `translateY(${scrollY * 0.5}px)`;
    const imageTransform = `translateY(${scrollY * 0.2}px)`;
    const overlayOpacity = Math.min(scrollY / 500, 0.8);

    return (
        <div className="relative w-full h-screen overflow-hidden">
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
                        className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-10"
                        style={{ opacity: overlayOpacity }}
                    />

                    {/* Slider controls */}
                    <div className="absolute inset-x-0 top-1/2 flex justify-between px-4 z-30">
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
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Content container */}
                    <div className="relative h-full flex items-center justify-center px-4 z-20">
                        <Card className="max-w-6xl w-full bg-black/30 backdrop-blur-sm border-none p-8 text-white"
                            style={{ transform: headerTransform }}>
                            <div>
                                <AnimatedTestimonials testimonials={testimonials} />
                            </div>
                            <div className='px-8'>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                    Discover Amazing Things
                                </h1>

                                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                                    Twin Star Tour & Travel provides a choice of tour package for Domestic & Overseas.
                                </p>
                                <div className="flex gap-4">
                                    <Button variant="default">
                                        Let's Tour
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </div>

    );
}

export default HomeComponent