import HeaderComponent from "@/components/navbar/header"

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default PublicLayout