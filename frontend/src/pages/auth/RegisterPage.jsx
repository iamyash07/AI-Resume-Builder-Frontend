import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../components/common/Logo";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            toast.success("Account created! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">

            {/* Left Side — Black Panel */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 bg-black p-12">
                <div className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-lg">
                        <span className="text-black text-lg font-bold">R</span>
                    </div>
                    <span className="text-white text-base font-semibold tracking-tight">
                        ResumeAI
                    </span>
                </div>

                <div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Join thousands of job seekers who have landed
                        their dream jobs using AI-powered resumes.
                    </p>
                    <div className="mt-8 space-y-3">
                        {[
                            "Create unlimited resumes",
                            "AI-powered content generation",
                            "Track all job applications",
                            "Interview question preparation",
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                <p className="text-gray-500 text-xs">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-gray-700 text-xs">
                    © 2026 ResumeAI
                </p>
            </div>

            {/* Right Side — Register Form */}
            <div className="flex-1 flex flex-col">

                {/* Top Logo */}
                <div className="p-8">
                    <Logo />
                </div>

                {/* Form Center */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm">

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-black">
                                Create account
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Start building your professional resume
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full pl-9 pr-4 py-3 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Email
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-9 pr-4 py-3 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-9 pr-10 py-3 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-9 pr-4 py-3 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-3 rounded-xl transition duration-200"
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </form>

                        <p className="text-center text-gray-400 text-xs mt-8">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-black font-medium hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;