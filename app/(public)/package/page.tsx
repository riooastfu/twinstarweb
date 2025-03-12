// app/packages/page.tsx
import PackageComponent from '@/components/package/package'
import React from 'react'
import { Metadata } from 'next'

// Static metadata for the packages listing page
export const metadata: Metadata = {
    title: 'Tour Packages | Twin Star Tour & Travel',
    description: 'Explore our curated selection of premium tour packages. Discover amazing destinations, cultural experiences, and adventure travel options. Book your dream vacation today!',
    keywords: 'tour packages, travel packages, Indonesia travel, vacation packages, group tours',
    openGraph: {
        title: 'Tour Packages | Twin Star Tour & Travel',
        description: 'Discover our premier selection of travel experiences designed to create unforgettable memories.',
        url: 'https://twinstar.com/package',
        siteName: 'Twin Star Tour & Travel',
        images: [
            {
                url: '/img/packages-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Twin Star Tour & Travel Packages',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tour Packages | Twin Star Tour & Travel',
        description: 'Explore our premium tour packages and book your dream vacation today!',
        images: ['/img/packages-og.jpg'],
    },
}

export default function PackagesPage() {
    return (
        <main>
            <PackageComponent />
        </main>
    )
}