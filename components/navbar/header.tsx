"use client"
import { Sun, Moon, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const HeaderComponent = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="w-full py-2 px-4 sm:px-6 bg-white dark:bg-gray-950 border-b dark:border-gray-800 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="font-bold text-xl dark:text-white">
                        Twinstar
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/package" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                        Package
                    </Link>
                    <Link href="/aboutus" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden sm:flex"
                    >
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                    <Button className="hidden sm:flex bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-4 sm:px-6 text-sm">
                        Book a call
                    </Button>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        className="flex md:hidden"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-16 px-4">
                    <nav className="flex flex-col items-center gap-6 pt-8">
                        <Link
                            href="/package"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Package
                        </Link>
                        <Link
                            href="/aboutus"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-lg"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mt-2"
                        >
                            <Moon className="h-5 w-5" />
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-6 text-sm w-full max-w-xs mt-4">
                            Book a call
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default HeaderComponent