"use client"

import React from 'react';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const AboutUsComponent = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-90"></div>
                <Image
                    src="/img/bghero.jpg" // Use one of your beach/travel images
                    alt="Beautiful travel destinations"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
                        About Twin Star Tour & Travel
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column - Company Info */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 mr-4 relative flex-shrink-0">
                                    <Image
                                        src="/img/logo.png" // Replace with your actual logo
                                        alt="Twin Star Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-orange-600">Twin Star</h2>
                                    <h3 className="text-lg text-orange-500">Tour & Travel</h3>
                                </div>
                            </div>

                            {/* Improved Company Credentials - Matching the screenshot */}
                            <div className="space-y-6 text-gray-700">
                                <div className="flex">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-xl">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">Licensed and Authorized Travel Agent in</h4>
                                        <p className="text-gray-700">North Sumatra, Indonesia</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-xl">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">Established:</h4>
                                        <p className="text-gray-700">October 31, 2011</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-xl">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">Legal Entity Registration:</h4>
                                        <p className="text-gray-700">NOTARIS ERICSON NAPITUPULU, SH NOMOR 51 OKTOBER 2011</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-xl">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">Business License Number:</h4>
                                        <p className="text-gray-700">9120502057142</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-xl">5</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">Tax ID:</h4>
                                        <p className="text-gray-700">03.329.735.0-121.000</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-xl">6</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">Tourism Business Registry:</h4>
                                        <p className="text-gray-700">04074/2010/DISPARBUDISUMUT/2016</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-orange-200">
                                <h3 className="text-xl font-bold text-orange-600 mb-4">Contact Us</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 text-orange-500 mr-3" />
                                        <span>+62 811-651-2222</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 text-orange-500 mr-3" />
                                        <span>info@twinstar.com</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <Link href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="md:col-span-7 lg:col-span-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6">Our Story</h2>

                            <div className="prose prose-orange lg:prose-lg max-w-none text-gray-700">
                                <p className="mb-4">
                                    <span className="font-semibold text-orange-600">TWIN STAR TOUR & TRAVEL</span> is a brand from PT. Nusa Bintang Perkasa which was established in 2011. Twin Star Tour & Travel is a licensed and authorized Travel Agent in North Sumatra-Indonesia.
                                </p>

                                <p className="mb-4">
                                    We have experience handling both inbound and outbound tourism. Our inbound services cover all regions in Indonesia in general and for outbound tourism, we cover many countries in the world.
                                </p>

                                <p className="mb-4">
                                    We are committed to providing customer satisfaction and comfort as our main service priority. We have experienced staff and are always ready to provide the best service for your comfortable holiday.
                                </p>

                                <h3 className="text-xl font-bold text-orange-600 mt-8 mb-4">Our Packages</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-orange-50 p-5 rounded-lg">
                                        <h4 className="text-lg font-bold text-orange-600 mb-2">Domestic (Inbound)</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Sumatra Tour (North Sumatra, West Sumatra, Aceh)</li>
                                            <li>Orangutan & Elephant Tour</li>
                                            <li>Bukit Lawang Tour</li>
                                            <li>Lake Toba, Tangkahan, Orangutan & Dayak Culture</li>
                                        </ul>
                                    </div>

                                    <div className="bg-orange-50 p-5 rounded-lg">
                                        <h4 className="text-lg font-bold text-orange-600 mb-2">Overseas (Outbound)</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Thailand, Bangkok, Penang, Singapore</li>
                                            <li>China, Hong Kong, Turkey (8D 7N)</li>
                                            <li>Korea (6D 5N)</li>
                                            <li>Muslim Friendly (6D 4N)</li>
                                        </ul>
                                    </div>
                                </div>

                                <p className="mb-4">
                                    You will get many facilities in each package. Our guide is very professional, so you don't have to worry anymore if you can't speak English fluently. We also offer affordable prices for you waiting for, to help you. By using a twin star tour & travel your vacation will be more efficient, because we have prepared a systematic visit schedule.
                                </p>

                                <div className="bg-gradient-to-r from-orange-100 to-red-50 p-6 rounded-lg mt-8">
                                    <h3 className="text-xl font-bold text-orange-600 mb-4">Why Choose Us?</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">✓</span>
                                            Experienced team with extensive knowledge of destinations
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">✓</span>
                                            Customized travel packages to suit your preferences
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">✓</span>
                                            Multilingual guides for international travelers
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">✓</span>
                                            Competitive prices with great value for money
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">✓</span>
                                            24/7 customer support during your journey
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex justify-center md:justify-start mt-8">
                                    <Link href="/package" className="inline-block bg-orange-600 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors shadow-md text-center">
                                        Explore Our Tour Packages
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banking Info Section */}
            <div className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Banking Information</h2>
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-bold text-orange-600 mb-2">BANK CENTRAL ASIA</h3>
                                <p className="text-gray-700">
                                    CABANG BEKERING: 6250611234<br />
                                    ATAS NAMA: TWIN STAR TOUR & TRAVEL
                                </p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-bold text-orange-600 mb-2">Legal Registration</h3>
                                <p className="text-gray-700 text-sm">
                                    PENGESAHAN BADAN HUKUM PERSEROAN OLEH MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA, NOMOR AHU-0077323-AH.01.09.TAHUN 2014 TANGGAL 21 JULI 2014
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsComponent;