import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../components/common/Logo";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/api/auth/login", formData);
            login(res.data.data.token, res.data.data.user);
            toast.success("Welcome back!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">

            {/* Left Side — Black Panel */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 bg-black p-12">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1.5 rounded-lg">
                            <span className="text-black text-lg font-bold">R</span>
                        </div>
                        <span className="text-white text-base font-semibold tracking-tight">
                            ResumeAI
                        </span>
                    </div>
                </div>

                <div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Build professional resumes with AI assistance.
                        Stand out from the crowd and land your dream job.
                    </p>
                    <div className="mt-8 space-y-3">
                        {[
                            "AI-generated bullet points",
                            "Resume scoring & feedback",
                            "Job description matching",
                            "Interview preparation",
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                <p className="text-gray-500 text-xs">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-gray-700 text-xs">
                    © 2024 ResumeAI
                </p>
            </div>

            {/* Right Side — Login Form */}
            <div className="flex-1 flex flex-col">

                {/* Top Logo (visible on mobile & desktop) */}
                <div className="p-8">
                    <Logo />
                </div>

                {/* Form Center */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm">

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-black">
                                Welcome back
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Enter your credentials to continue
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-3 rounded-xl transition duration-200"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                        </form>

                        <p className="text-center text-gray-400 text-xs mt-8">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-black font-medium hover:underline"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;