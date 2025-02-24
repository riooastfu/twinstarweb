import CarRentalComponent from '@/components/home/car-rental'
import HomeComponent from '@/components/home/home'
import PackageComponent from '@/components/home/package'
import HeaderComponent from '@/components/navbar/header'
import React from 'react'

const MainPage = () => {
    return (
        <>
            <HomeComponent />
            <div className='py-6 px-44'>
                <PackageComponent />
                <CarRentalComponent />
            </div>
        </>
    )
}

export default MainPage