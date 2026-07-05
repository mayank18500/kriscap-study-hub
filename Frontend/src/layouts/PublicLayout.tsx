import { Outlet } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
            <Header />
            {/* Add top padding to account for fixed header (h-16 md:h-20) */}
            <main className="flex-1 pt-20 md:pt-24 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
