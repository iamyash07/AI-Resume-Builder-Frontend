import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResumes, deleteResume } from "../../services/resumeService";
import { ResumesSkeleton } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import {
    FiPlus,
    FiFileText,
    FiEdit2,
    FiTrash2,
    FiCalendar,
} from "react-icons/fi";

const ResumesPage = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await getAllResumes();
            setResumes(res.data.data.resumes);
        } catch (error) {
            toast.error("Failed to load resumes");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resume?")) return;
        setDeleting(id);
        try {
            await deleteResume(id);
            setResumes(resumes.filter((r) => r._id !== id));
            toast.success("Resume deleted!");
        } catch (error) {
            toast.error("Failed to delete resume");
        } finally {
            setDeleting(null);
        }
    };

    if (loading) return <ResumesSkeleton />;

    return (
        <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 w-full">
            {/* Header - stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-black">
                        My Resumes
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {resumes.length} resume{resumes.length !== 1 ? "s" : ""} created
                    </p>
                </div>
                <button
                    onClick={() => navigate("/resume/new")}
                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition w-full sm:w-auto"
                >
                    <FiPlus className="flex-shrink-0" />
                    <span className="whitespace-nowrap">Create Resume</span>
                </button>
            </div>

            {resumes.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-16 text-center mx-auto w-full">
                    <FiFileText className="text-4xl text-gray-200 mx-auto mb-4" />
                    <p className="text-sm font-medium text-black">No resumes yet</p>
                    <p className="text-xs text-gray-400 mt-1 mb-6">
                        Create your first resume to get started
                    </p>
                    <button
                        onClick={() => navigate("/resume/new")}
                        className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 w-full sm:w-auto mx-auto"
                    >
                        <FiPlus className="flex-shrink-0" /> <span className="whitespace-nowrap">Create Resume</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate("/resume/new")}
                        className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-black transition duration-200 group"
                    >
                        <FiPlus className="text-2xl text-gray-200 mx-auto mb-3 group-hover:text-black transition" />
                        <p className="text-sm font-medium text-gray-400 group-hover:text-black transition">
                            Create New Resume
                        </p>
                    </button>

                    {resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:border-black transition duration-200 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gray-50 p-2.5 rounded-xl">
                                    <FiFileText className="text-gray-400 text-lg" />
                                </div>
                                {/* Always visible on mobile, hover on desktop */}
                                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition">
                                    <button
                                        onClick={() => navigate(`/resume/${resume._id}`)}
                                        className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-black transition"
                                    >
                                        <FiEdit2 className="text-sm" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(resume._id)}
                                        disabled={deleting === resume._id}
                                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition"
                                    >
                                        <FiTrash2 className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            <h3
                                onClick={() => navigate(`/resume/${resume._id}`)}
                                className="font-semibold text-black text-sm cursor-pointer hover:underline break-words"
                            >
                                {resume.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 truncate">
                                {resume.personalInfo?.fullName || "No name added"}
                            </p>

                            <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-50">
                                <FiCalendar className="text-gray-300 text-xs shrink-0" />
                                <p className="text-xs text-gray-400">
                                    {new Date(resume.updatedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumesPage;