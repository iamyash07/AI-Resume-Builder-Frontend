import { FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../common/Logo";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out!");
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            <Logo />
            <div className="flex items-center gap-3 md:gap-6">
                <div className="hidden sm:flex items-center gap-2">
                    <FiUser className="text-gray-300 text-sm" />
                    <span className="text-sm text-gray-500">
                        {user?.name}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-black transition font-medium"
                >
                    <FiLogOut />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;