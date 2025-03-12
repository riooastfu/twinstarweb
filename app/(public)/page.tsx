import CarRentalComponent from '@/components/home/car-rental'
import HomeComponent from '@/components/home/home'
import PackageComponent from '@/components/home/package'
import HeaderComponent from '@/components/navbar/header'
import FooterComponent from '@/components/navbar/footer'
import React from 'react'

const MainPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <HomeComponent />
                <div className="container mx-auto w-full">
                    {/* Content area with proportional padding that scales with viewport */}
                    <div className="w-full px-[5%] sm:px-[7%] md:px-[10%] lg:px-[12%] py-6 sm:py-10">
                        <div className="space-y-12">
                            <PackageComponent />
                            <CarRentalComponent />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MainPage