import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Sidebar />
            {/* Desktop: ml-56, Mobile: ml-0 with pb for bottom nav */}
            <main className="md:ml-56 pt-20 md:pt-24 pb-20 md:pb-8 px-4 md:px-8">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;