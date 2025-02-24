"use client"
import { Sun, Moon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

const HeaderComponent = () => {
    return (
        <header className="w-full py-2 px-6 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl dark:text-white">Twinstar</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                        Features
                    </a>
                    <a href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                        Pricing
                    </a>
                    <a href="#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                        Contact
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Moon className="h-[1.2rem] w-[1.2rem]" />

                    </Button>
                    <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-6 text-sm">
                        Book a call
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent