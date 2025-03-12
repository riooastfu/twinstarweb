"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = true,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile view on mount and resize
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };

            // Initial check
            checkMobile();

            // Add event listener
            window.addEventListener('resize', checkMobile);

            // Cleanup
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, []);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    return (
        <div className="w-full mx-auto antialiased font-sans pt-2 pb-4">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Text content - moved to top on mobile for better visibility */}
                <div className="flex justify-between flex-col py-2 order-2 md:order-2">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                            {testimonials[active].name}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-200">
                            {testimonials[active].designation}
                        </p>
                        <motion.p className="text-sm sm:text-base md:text-lg text-zinc-200 mt-2 sm:mt-4 line-clamp-5 md:line-clamp-none">
                            {testimonials[active].quote}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-2 sm:gap-4 pt-4">
                        <button
                            onClick={handlePrev}
                            className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                        >
                            <IconArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                        >
                            <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Image section - hidden on mobile */}
                <div className="hidden md:block order-1 md:order-1">
                    <div className="relative h-48 sm:h-64 md:h-72 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index)
                                            ? 999
                                            : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -20, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <div className="h-full w-full rounded-xl md:rounded-3xl bg-gray-300 overflow-hidden relative">
                                        <Image
                                            src={testimonial.src}
                                            alt={testimonial.name}
                                            fill
                                            sizes="(max-width: 768px) 0vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index === active}
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};