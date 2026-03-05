import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { DashboardSkeleton } from "../../components/common/Skeleton";
import {
    FiFileText,
    FiBriefcase,
    FiCpu,
    FiPlus,
    FiArrowRight,
    FiTrendingUp,
} from "react-icons/fi";

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resumesRes, jobsRes] = await Promise.all([
                    api.get("/api/resume"),
                    api.get("/api/jobs"),
                ]);
                setResumes(resumesRes.data.data.resumes);
                setJobs(jobsRes.data.data.applications);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: "Total Resumes", value: resumes.length, icon: FiFileText },
        { label: "Applications", value: jobs.length, icon: FiBriefcase },
        {
            label: "Interviews",
            value: jobs.filter((j) => j.status === "interview").length,
            icon: FiTrendingUp,
        },
        { label: "AI Features", value: 5, icon: FiCpu },
    ];

    const quickActions = [
        {
            label: "Create Resume",
            description: "Build a professional resume with AI",
            icon: FiFileText,
            action: () => navigate("/resume/new"),
        },
        {
            label: "AI Tools",
            description: "Generate summaries, bullets & more",
            icon: FiCpu,
            action: () => navigate("/ai"),
        },
        {
            label: "Track Job",
            description: "Add a new job application",
            icon: FiBriefcase,
            action: () => navigate("/jobs"),
        },
    ];

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="space-y-10 max-w-5xl">
            <div className="border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-semibold text-black">
                    Good day, {user?.name}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Here's your resume building overview.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white border border-gray-100 rounded-2xl p-6"
                    >
                        <stat.icon className="text-gray-300 text-xl mb-4" />
                        <p className="text-3xl font-bold text-black">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            onClick={action.action}
                            className="bg-white border border-gray-100 rounded-2xl p-6 text-left hover:border-black transition duration-200 group"
                        >
                            <action.icon className="text-gray-300 text-xl mb-4 group-hover:text-black transition" />
                            <p className="font-semibold text-black text-sm">{action.label}</p>
                            <p className="text-xs text-gray-400 mt-1">{action.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                        Recent Resumes
                    </h2>
                    <button
                        onClick={() => navigate("/resume")}
                        className="text-xs text-black font-medium flex items-center gap-1 hover:underline"
                    >
                        View all <FiArrowRight />
                    </button>
                </div>

                {resumes.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
                        <FiFileText className="text-3xl text-gray-200 mx-auto mb-3" />
                        <p className="text-sm font-medium text-black">No resumes yet</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Create your first resume to get started
                        </p>
                        <button
                            onClick={() => navigate("/resume/new")}
                            className="mt-4 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2 mx-auto"
                        >
                            <FiPlus /> Create Resume
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resumes.slice(0, 3).map((resume) => (
                            <div
                                key={resume._id}
                                onClick={() => navigate(`/resume/${resume._id}`)}
                                className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-black transition duration-200"
                            >
                                <FiFileText className="text-gray-300 text-xl mb-4" />
                                <p className="font-semibold text-black text-sm">
                                    {resume.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Updated{" "}
                                    {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                        Recent Applications
                    </h2>
                    <button
                        onClick={() => navigate("/jobs")}
                        className="text-xs text-black font-medium flex items-center gap-1 hover:underline"
                    >
                        View all <FiArrowRight />
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
                        <FiBriefcase className="text-3xl text-gray-200 mx-auto mb-3" />
                        <p className="text-sm font-medium text-black">
                            No applications yet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Start tracking your job applications
                        </p>
                        <button
                            onClick={() => navigate("/jobs")}
                            className="mt-4 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2 mx-auto"
                        >
                            <FiPlus /> Add Application
                        </button>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                        {jobs.slice(0, 5).map((job, index) => (
                            <div
                                key={job._id}
                                className={`flex items-center justify-between px-6 py-4 ${
                                    index !== jobs.slice(0, 5).length - 1
                                        ? "border-b border-gray-50"
                                        : ""
                                }`}
                            >
                                <div>
                                    <p className="text-sm font-medium text-black">
                                        {job.position}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {job.company}
                                    </p>
                                </div>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100 capitalize">
                                    {job.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;