import React from 'react'

interface PackageProps {
    params: {
        id: number;
    };
}

const PackagePage = async ({ params }: PackageProps) => {
    return (
        <div>PackagePage {params.id}</div>
    )
}

export default PackagePage