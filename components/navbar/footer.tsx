import { Facebook, Twitter, VoicemailIcon, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FooterComponent = () => {
    return (
        <footer className="px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
                {/* Left Section - Company Info */}
                <div className=''>
                    <h2 className="text-xl font-bold flex items-center space-x-2">
                        <span className="text-blue-500 text-3xl">logo</span>
                        <span>Travel.</span>
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut diam et nibh condimentum venenatis.
                    </p>
                    <div className="flex space-x-4 mt-4 text-gray-500">
                        <Twitter size={18} className="hover:text-blue-500 cursor-pointer" />
                        <Youtube size={18} className="hover:text-red-500 cursor-pointer" />
                        <Facebook size={18} className="hover:text-blue-600 cursor-pointer" />
                        <VoicemailIcon size={18} className="hover:text-blue-400 cursor-pointer" />
                    </div>
                </div>

                {/* Middle Section - Navigation - grid for mobile, flex for desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:justify-end">
                    <div>
                        <h3 className="font-semibold">Our Agency</h3>
                        <ul className="text-gray-600 text-sm mt-2 space-y-1">
                            <li><Link href="#">Services</Link></li>
                            <li><Link href="#">Insurance</Link></li>
                            <li><Link href="#">Agency</Link></li>
                            <li><Link href="#">Tourism</Link></li>
                            <li><Link href="#">Payment</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Partners</h3>
                        <ul className="text-gray-600 text-sm mt-2 space-y-1">
                            <li><Link href="#">Booking</Link></li>
                            <li><Link href="#">RentalCar</Link></li>
                            <li><Link href="#">HostelWorld</Link></li>
                            <li><Link href="#">Trivago</Link></li>
                            <li><Link href="#">TripAdvisor</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Last Minute</h3>
                        <ul className="text-gray-600 text-sm mt-2 space-y-1">
                            <li><Link href="#">London</Link></li>
                            <li><Link href="#">California</Link></li>
                            <li><Link href="#">Indonesia</Link></li>
                            <li><Link href="#">Europe</Link></li>
                            <li><Link href="#">Oceania</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Copyright */}
            <div className="bg-blue-500 text-white text-center py-3 mt-8 text-xs sm:text-sm">
                <p>&copy; Copyright riooasbr - 2025</p>
            </div>
        </footer>
    )
}

export default FooterComponent;