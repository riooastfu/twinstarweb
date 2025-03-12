"use client"

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const ContactComponent = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                    src="/img/bghero.jpg" // Replace with your beach image
                    alt="Twin Star Tour & Travel Contact"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-red-500/80"></div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="flex items-center mb-3">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mr-2">Contact</h1>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic">"</span>
                    </div>
                    <p className="text-center max-w-2xl text-sm md:text-base">
                        For information or booking your tour & travel services, you can directly contact the contact listed below, our admin will always serve you 24 hours via whatsapp chat
                    </p>
                </div>

                {/* Curved bottom edge */}
                <div className="absolute -bottom-1 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" className="w-full">
                        <path fill="white" fillOpacity="1" d="M0,0L1440,32L1440,64L0,64Z"></path>
                    </svg>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {/* Phone Contact Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <Phone className="h-8 w-8 text-orange-500" />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">Contact</h3>
                            <p className="text-orange-500 font-semibold mb-2">+62 811 651 2222</p>
                            <p className="text-gray-600">+62 811 654 3333</p>
                            <Link
                                href="https://wa.me/628116512222"
                                className="mt-4 inline-block bg-green-500 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-green-600 transition-colors"
                            >
                                WhatsApp Chat
                            </Link>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <Mail className="h-8 w-8 text-orange-500" />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">E-mail</h3>
                            <p className="text-orange-500 font-semibold mb-2">info@twinstar.co.id</p>
                            <p className="text-gray-600">booking@twinstar.co.id</p>
                            <Link
                                href="mailto:info@twinstar.co.id"
                                className="mt-4 inline-block bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Send Email
                            </Link>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <MapPin className="h-8 w-8 text-orange-500" />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="font-bold text-lg text-gray-800 mb-4">Address</h3>
                            <p className="text-gray-600 mb-2">Jl. Ring Road Gagak</p>
                            <p className="text-gray-600 mb-2">Medan 20122</p>
                            <p className="text-orange-500 font-semibold">North Sumatra, Indonesia</p>
                            <Link
                                href="https://maps.google.com/?q=Medan,North+Sumatra,Indonesia"
                                target="_blank"
                                className="mt-4 inline-block bg-red-500 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-red-600 transition-colors"
                            >
                                View on Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map and Form Section */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl overflow-hidden shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Map */}
                        <div className="relative h-64 md:h-full min-h-[320px]">
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                {/* Replace with actual iframe map, e.g.: */}
                                {/* <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" frameBorder="0" allowFullScreen></iframe> */}
                                <div className="text-center p-6">
                                    <MapPin className="h-10 w-10 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-600">Map placeholder - replace with actual Google Maps iframe</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter subject"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-md hover:from-orange-600 hover:to-red-600 transition-colors shadow-md"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Hours & Social Media */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Business Hours */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <Clock className="h-6 w-6 text-orange-500 mr-3" />
                            <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                                <span className="text-gray-600">Monday - Friday</span>
                                <span className="font-semibold">8:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                                <span className="text-gray-600">Saturday</span>
                                <span className="font-semibold">9:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                                <span className="text-gray-600">Sunday</span>
                                <span className="font-semibold">Closed</span>
                            </div>
                            <p className="text-orange-500 mt-4 italic">
                                24/7 WhatsApp support available for bookings and inquiries
                            </p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Connect With Us</h3>
                        <p className="text-gray-600 mb-6">
                            Follow us on social media to get updates on our latest tour packages, travel tips, and special promotions.
                        </p>
                        <div className="grid grid-cols-4 gap-4">
                            <Link href="#" className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                                    <Facebook className="h-6 w-6 text-orange-500" />
                                </div>
                                <span className="text-xs text-gray-600">Facebook</span>
                            </Link>
                            <Link href="#" className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                                    <Twitter className="h-6 w-6 text-orange-500" />
                                </div>
                                <span className="text-xs text-gray-600">Twitter</span>
                            </Link>
                            <Link href="#" className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                                    <Instagram className="h-6 w-6 text-orange-500" />
                                </div>
                                <span className="text-xs text-gray-600">Instagram</span>
                            </Link>
                            <Link href="#" className="flex flex-col items-center group">
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                                    <Youtube className="h-6 w-6 text-orange-500" />
                                </div>
                                <span className="text-xs text-gray-600">YouTube</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 py-12 mt-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Your Adventure?</h2>
                    <p className="text-white text-opacity-90 max-w-2xl mx-auto mb-6">
                        Contact us today to plan your perfect getaway. Our team is ready to create an unforgettable experience for you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="https://wa.me/628116512222"
                            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-md"
                        >
                            WhatsApp Now
                        </Link>
                        <Link
                            href="/package"
                            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
                        >
                            View Tour Packages
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactComponent;