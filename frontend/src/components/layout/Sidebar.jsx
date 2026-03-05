import { NavLink } from "react-router-dom";
import {
    FiGrid,
    FiFileText,
    FiBriefcase,
    FiCpu,
} from "react-icons/fi";

const navItems = [
    { path: "/dashboard", icon: FiGrid, label: "Dashboard" },
    { path: "/resume", icon: FiFileText, label: "My Resumes" },
    { path: "/ai", icon: FiCpu, label: "AI Tools" },
    { path: "/jobs", icon: FiBriefcase, label: "Job Tracker" },
];

const Sidebar = () => {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 bg-white border-r border-gray-100 p-4">
                <div className="space-y-0.5">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                                    isActive
                                        ? "bg-black text-white font-medium"
                                        : "text-gray-400 hover:text-black hover:bg-gray-50"
                                }`
                            }
                        >
                            <item.icon className="text-base" />
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
                <div className="flex items-center justify-around px-2 py-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${
                                    isActive
                                        ? "text-black"
                                        : "text-gray-400 hover:text-black"
                                }`
                            }
                        >
                            <item.icon className="text-xl" />
                            <span className="text-xs">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Sidebar;