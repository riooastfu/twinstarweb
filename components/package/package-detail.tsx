"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Clock, MapPin, Users, AlertCircle, ChevronRight, Heart, Calendar, Tag, Info, CheckCircle, X, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface PackageDetailParamProps {
    params: {
        id: string;
    };
}

// Interface that matches your MasterPackage schema
interface PackageDetailProps {
    id: string;
    packageTitle: string;
    duration: string;
    price: number;
    description: string;
    image: string;
}

const PackageDetailComponent = ({ params }: PackageDetailParamProps) => {
    const router = useRouter();
    const [packageData, setPackageData] = useState<PackageDetailProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [personCount, setPersonCount] = useState(2);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showGallery, setShowGallery] = useState(false);

    // Mock data for the package features that aren't in the DB yet
    const mockFeatures = {
        location: "Indonesia",
        groupSize: { min: 2, max: 15 },
        highlights: [
            "Experience stunning natural landscapes",
            "Immerse in local culture and traditions",
            "Enjoy guided tours with experienced local guides",
            "Comfortable accommodations throughout your journey",
            "Taste authentic local cuisine"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival and Welcome",
                description: "Upon arrival, our representative will meet you and transfer you to your hotel. Enjoy a welcome dinner and briefing about the tour.",
                activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"]
            },
            {
                day: 2,
                title: "Exploring Local Attractions",
                description: "After breakfast, embark on a full-day guided tour of the main attractions. Visit historical sites and enjoy local cuisine for lunch.",
                activities: ["Guided tour", "Historical site visits", "Local cuisine experience"]
            },
            {
                day: 3,
                title: "Nature and Adventure",
                description: "Today is dedicated to natural wonders. Trek through scenic landscapes and enjoy breathtaking views. Optional adventure activities available.",
                activities: ["Nature trek", "Scenic viewpoints", "Optional adventure activities"]
            }
        ],
        inclusions: [
            "Accommodation in 3-4 star hotels",
            "Daily breakfast and selected meals",
            "All transportation during the tour",
            "English-speaking professional guide",
            "Entrance fees to attractions",
            "Welcome dinner on arrival day"
        ],
        exclusions: [
            "International airfare",
            "Personal expenses and gratuities",
            "Travel insurance",
            "Optional activities not mentioned in the itinerary",
            "Alcoholic beverages"
        ],
        availableDates: [
            { date: "2025-05-15", spots: 12 },
            { date: "2025-06-10", spots: 8 },
            { date: "2025-07-05", spots: 15 },
            { date: "2025-08-20", spots: 10 }
        ],
        reviews: [
            {
                id: 1,
                name: "Michael Smith",
                rating: 5,
                comment: "Amazing experience! The guides were knowledgeable and the itinerary was perfect.",
                date: "March 15, 2025"
            },
            {
                id: 2,
                name: "Sarah Johnson",
                rating: 4,
                comment: "Great tour overall. Accommodations were comfortable and the sights were breathtaking.",
                date: "February 22, 2025"
            }
        ],
        faqs: [
            {
                question: "What should I pack for this tour?",
                answer: "We recommend comfortable walking shoes, weather-appropriate clothing, sunscreen, and a camera. A detailed packing list will be provided after booking."
            },
            {
                question: "Is this tour suitable for children?",
                answer: "This tour is suitable for children aged 8 and above. Certain activities may have age restrictions for safety reasons."
            },
            {
                question: "What is the cancellation policy?",
                answer: "Free cancellation up to 30 days before departure. Cancellations 15-29 days before departure receive a 50% refund. No refunds for cancellations less than 14 days before departure."
            }
        ]
    };

    useEffect(() => {
        const fetchPackageDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const packageId = params?.id;

                if (!packageId) {
                    router.push('/package');
                    return;
                }

                const response = await fetch(`/api/packages/${packageId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Package not found");
                    }
                    throw new Error(`Error fetching package: ${response.status}`);
                }

                const data = await response.json();
                setPackageData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching package details:", error);
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
                setLoading(false);
            }
        };

        fetchPackageDetail();
    }, [params, router]);

    const incrementPerson = () => {
        if (personCount < mockFeatures.groupSize.max) {
            setPersonCount(prev => prev + 1);
        }
    };

    const decrementPerson = () => {
        if (personCount > mockFeatures.groupSize.min) {
            setPersonCount(prev => prev - 1);
        }
    };

    const calculateTotalPrice = () => {
        if (!packageData) return 0;
        return packageData.price * personCount;
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Render star ratings for reviews
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
            } else {
                stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                <span className="ml-3 text-gray-600 text-lg">Loading package details...</span>
            </div>
        );
    }

    if (error || !packageData) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h1>
                <p className="text-gray-600 mb-6">{error || "The tour package you're looking for doesn't exist or has been removed."}</p>
                <Link href="/package">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        Browse All Packages
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
                <Image
                    src={packageData.image}
                    alt={packageData.packageTitle}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        {/* SEO-friendly breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="mb-4">
                            <ol className="flex text-sm md:text-base space-x-2 items-center text-gray-200">
                                <li>
                                    <Link href="/" className="hover:text-white">Home</Link>
                                </li>
                                <ChevronRight className="h-4 w-4" />
                                <li>
                                    <Link href="/package" className="hover:text-white">Tour Packages</Link>
                                </li>
                                <ChevronRight className="h-4 w-4" />
                                <li className="font-medium text-white">
                                    <span aria-current="page">{packageData.packageTitle}</span>
                                </li>
                            </ol>
                        </nav>

                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                            {packageData.packageTitle}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm md:text-base">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                {packageData.duration}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                {mockFeatures.location}
                            </div>
                            <div className="flex items-center">
                                <Users className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                {mockFeatures.groupSize.min}-{mockFeatures.groupSize.max} Travelers
                            </div>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="flex items-center"
                                onClick={() => setShowGallery(true)}
                            >
                                View Gallery
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Package Details */}
                    <div className="lg:col-span-2">
                        {/* Package Description */}
                        <section aria-labelledby="overview-heading" className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                            <div className="p-6 md:p-8">
                                <h2 id="overview-heading" className="text-2xl font-bold text-gray-800 mb-4">Tour Overview</h2>
                                <div className="prose prose-orange max-w-none">
                                    <p className="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
                                        {packageData.description}
                                    </p>
                                </div>

                                {/* Highlights Section */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Highlights</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {mockFeatures.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Package Features */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                                        <h4 className="font-semibold text-center text-gray-800">{packageData.duration}</h4>
                                        <p className="text-gray-600 text-sm text-center">Duration</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <Users className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                                        <h4 className="font-semibold text-center text-gray-800">
                                            {mockFeatures.groupSize.min}-{mockFeatures.groupSize.max} People
                                        </h4>
                                        <p className="text-gray-600 text-sm text-center">Group Size</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <Calendar className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                                        <h4 className="font-semibold text-center text-gray-800">Year-round</h4>
                                        <p className="text-gray-600 text-sm text-center">Availability</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Detailed Tabs */}
                        <section aria-labelledby="detail-tabs" className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                            <h2 id="detail-tabs" className="sr-only">Package Details</h2>
                            <Tabs defaultValue="itinerary">
                                <TabsList className="grid grid-cols-3 bg-gray-100 p-0 rounded-none">
                                    <TabsTrigger value="itinerary" className="py-4 rounded-none font-semibold">
                                        Itinerary
                                    </TabsTrigger>
                                    <TabsTrigger value="includes" className="py-4 rounded-none font-semibold">
                                        What's Included
                                    </TabsTrigger>
                                    <TabsTrigger value="faqs" className="py-4 rounded-none font-semibold">
                                        FAQs
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="itinerary" className="p-6 md:p-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Day-by-Day Itinerary</h3>
                                    <div className="space-y-8">
                                        {mockFeatures.itinerary.map((day) => (
                                            <div key={day.day} className="border-l-4 border-orange-500 pl-4 pb-6">
                                                <h4 className="font-bold text-lg mb-2">
                                                    Day {day.day}: {day.title}
                                                </h4>
                                                <p className="text-gray-700 mb-4">{day.description}</p>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {day.activities.map((activity, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full"
                                                        >
                                                            {activity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="includes" className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-green-600 flex items-center mb-4">
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                What's Included
                                            </h3>
                                            <ul className="space-y-2">
                                                {mockFeatures.inclusions.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-red-600 flex items-center mb-4">
                                                <X className="h-5 w-5 mr-2" />
                                                What's Not Included
                                            </h3>
                                            <ul className="space-y-2">
                                                {mockFeatures.exclusions.map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="faqs" className="p-6 md:p-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                                    <Accordion type="single" collapsible className="w-full">
                                        {mockFeatures.faqs.map((faq, index) => (
                                            <AccordionItem key={index} value={`faq-${index}`}>
                                                <AccordionTrigger className="text-left font-medium">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-700">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </TabsContent>
                            </Tabs>
                        </section>

                        {/* Customer Reviews Section */}
                        <section aria-labelledby="reviews-heading" className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 id="reviews-heading" className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
                                    <div className="flex items-center">
                                        <div className="flex mr-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-gray-700">
                                            4.8 out of 5 ({mockFeatures.reviews.length} reviews)
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {mockFeatures.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                            <div className="flex justify-between mb-2">
                                                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <div className="flex mb-2">
                                                {renderStars(review.rating)}
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 text-center">
                                    <Button variant="outline" className="bg-white">
                                        View All Reviews
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Booking Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                            <div className="border-b pb-4 mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    IDR {packageData.price.toLocaleString('id-ID')}
                                </h2>
                                <p className="text-gray-600 text-sm">per person</p>
                            </div>

                            {/* Date Selection */}
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-3">
                                    Select Departure Date
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {mockFeatures.availableDates.map((dateObj, index) => (
                                        <button
                                            key={index}
                                            className={`p-2 border rounded-md text-sm flex flex-col items-start ${selectedDate === dateObj.date
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'border-gray-300 hover:border-orange-500'
                                                }`}
                                            onClick={() => handleDateSelect(dateObj.date)}
                                        >
                                            <span className="font-medium">{formatDate(dateObj.date)}</span>
                                            <span className="text-xs mt-1">
                                                {selectedDate === dateObj.date ? 'Selected' : `${dateObj.spots} spots left`}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Person Count */}
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-3">
                                    Number of Travelers
                                </label>
                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <button
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border-r"
                                        onClick={decrementPerson}
                                        disabled={personCount <= mockFeatures.groupSize.min}
                                        aria-label="Decrease number of travelers"
                                    >
                                        -
                                    </button>
                                    <span className="flex-1 text-center py-2">{personCount}</span>
                                    <button
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border-l"
                                        onClick={incrementPerson}
                                        disabled={personCount >= mockFeatures.groupSize.max}
                                        aria-label="Increase number of travelers"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Min: {mockFeatures.groupSize.min}, Max: {mockFeatures.groupSize.max} people
                                </p>
                            </div>

                            {/* Price Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-700">Tour Price</span>
                                    <span className="font-semibold">
                                        IDR {packageData.price.toLocaleString('id-ID')} × {personCount}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-700">Service Fee</span>
                                    <span className="font-semibold">Included</span>
                                </div>
                                <div className="border-t pt-2 mt-2 flex justify-between">
                                    <span className="text-gray-700 font-bold">Total Price</span>
                                    <span className="font-bold text-lg text-orange-600">
                                        IDR {calculateTotalPrice().toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            {/* Call to Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-md shadow-md"
                                    disabled={!selectedDate}
                                >
                                    Book Now
                                </Button>
                                <Button
                                    className="w-full bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-md flex justify-center items-center gap-2"
                                >
                                    <Heart className="h-5 w-5" />
                                    Add to Wishlist
                                </Button>
                            </div>

                            {/* Contact */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-gray-700 text-sm mb-2">Need help with booking?</p>
                                <Link
                                    href="/contact"
                                    className="flex items-center text-orange-500 hover:text-orange-600 font-semibold"
                                >
                                    Contact Us
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>

                            {/* Trust indicators */}
                            <div className="mt-6 pt-6 border-t">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="flex flex-col items-center">
                                        <CheckCircle className="h-6 w-6 text-green-500 mb-1" />
                                        <span className="text-xs text-gray-600">Secure Payment</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <CheckCircle className="h-6 w-6 text-green-500 mb-1" />
                                        <span className="text-xs text-gray-600">24/7 Support</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <CheckCircle className="h-6 w-6 text-green-500 mb-1" />
                                        <span className="text-xs text-gray-600">Best Price</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Packages */}
            <section aria-labelledby="related-packages" className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 id="related-packages" className="text-2xl font-bold text-gray-800 mb-8 text-center">You Might Also Like</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((index) => (
                            <article
                                key={index}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            >
                                <Link href={`/package/${index + 10}`} className="block relative h-48">
                                    <Image
                                        src={`/img/bghero${index === 1 ? '' : index}.jpg`}
                                        alt={`Related tour package ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        4D 3N
                                    </div>
                                </Link>

                                <div className="p-5">
                                    <Link href={`/package/${index + 10}`}>
                                        <h3 className="font-bold text-gray-800 mb-2 hover:text-orange-500 transition-colors">
                                            {index === 1 ? "Cultural Heritage Tour" :
                                                index === 2 ? "Tropical Paradise Escape" :
                                                    "Adventure Mountain Trek"}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {index === 1 ? "Discover rich cultural heritage with traditional arts, ceremonies and historical sites." :
                                            index === 2 ? "Explore pristine beaches, crystal waters and vibrant marine life in this tropical paradise." :
                                                "Challenge yourself with mountain trekking, river rafting and other thrilling activities."}
                                    </p>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-500 text-xs">Starting from</p>
                                            <p className="text-lg font-bold text-orange-600">
                                                IDR {(3500000 + (index * 500000)).toLocaleString('id-ID')}
                                            </p>
                                        </div>

                                        <Link href={`/package/${index + 10}`} className="text-sm text-orange-500 font-medium hover:text-orange-700">
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-gradient-to-r from-orange-500 to-red-500 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready for an Unforgettable Experience?
                    </h2>
                    <p className="text-white text-opacity-90 max-w-2xl mx-auto mb-6">
                        Book your dream vacation today or contact our travel experts for personalized tour planning.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-2 px-6 rounded-full">
                                Contact Us
                            </Button>
                        </Link>
                        <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-2 px-6 rounded-full">
                            Request Brochure
                        </Button>
                    </div>
                </div>
            </section>

            {/* Gallery Modal - would need to be implemented with a modal component */}
            {showGallery && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                    <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-bold text-lg">Photo Gallery</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowGallery(false)}
                                aria-label="Close gallery"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Gallery would contain multiple images */}
                            <div className="aspect-square relative rounded overflow-hidden">
                                <Image
                                    src={packageData.image}
                                    alt={`${packageData.packageTitle} - gallery image`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Additional gallery images would be here */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageDetailComponent;