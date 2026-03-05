import { useState, useEffect } from "react";
import { getAllJobs, createJob, updateJob, deleteJob } from "../../services/jobService";
import { getAllResumes } from "../../services/resumeService";
import { JobsSkeleton } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import {
    FiPlus,
    FiBriefcase,
    FiTrash2,
    FiEdit2,
    FiX,
} from "react-icons/fi";

const STATUS_OPTIONS = ["saved", "applied", "interview", "offer", "rejected"];

const STATUS_STYLES = {
    saved: "bg-gray-50 text-gray-500 border-gray-100",
    applied: "bg-blue-50 text-blue-500 border-blue-100",
    interview: "bg-amber-50 text-amber-500 border-amber-100",
    offer: "bg-emerald-50 text-emerald-500 border-emerald-100",
    rejected: "bg-red-50 text-red-400 border-red-100",
};

const emptyForm = {
    company: "",
    position: "",
    jobDescription: "",
    status: "saved",
    notes: "",
    resumeId: "",
};

const JobTrackerPage = () => {
    const [jobs, setJobs] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [jobsRes, resumesRes] = await Promise.all([
                getAllJobs(),
                getAllResumes(),
            ]);
            setJobs(jobsRes.data.data.applications);
            setResumes(resumesRes.data.data.resumes);
        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.company || !formData.position) {
            toast.error("Please fill company and position!");
            return;
        }
        setSaving(true);
        try {
            if (editingId) {
                const res = await updateJob(editingId, formData);
                setJobs(jobs.map((j) =>
                    j._id === editingId ? res.data.data.application : j
                ));
                toast.success("Application updated!");
            } else {
                const res = await createJob(formData);
                setJobs([res.data.data.application, ...jobs]);
                toast.success("Application saved!");
            }
            resetForm();
        } catch (error) {
            toast.error("Failed to save application");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (job) => {
        setFormData({
            company: job.company,
            position: job.position,
            jobDescription: job.jobDescription || "",
            status: job.status,
            notes: job.notes || "",
            resumeId: job.resumeId?._id || "",
        });
        setEditingId(job._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this application?")) return;
        try {
            await deleteJob(id);
            setJobs(jobs.filter((j) => j._id !== id));
            toast.success("Application deleted!");
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const res = await updateJob(id, { status });
            setJobs(jobs.map((j) =>
                j._id === id ? res.data.data.application : j
            ));
            toast.success("Status updated!");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

    const filteredJobs = filterStatus === "all"
        ? jobs
        : jobs.filter((j) => j.status === filterStatus);

    const stats = STATUS_OPTIONS.map((status) => ({
        status,
        count: jobs.filter((j) => j.status === status).length,
    }));

    if (loading) return <JobsSkeleton />;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full space-y-8">

            {/* Header - stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-black">
                        Job Tracker
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {jobs.length} application{jobs.length !== 1 ? "s" : ""} tracked
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition w-full sm:w-auto"
                >
                    <FiPlus className="flex-shrink-0" />
                    <span className="whitespace-nowrap">Add Application</span>
                </button>
            </div>

            {/* Stats - scrollable on very small screens */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {stats.map((stat) => (
                    <button
                        key={stat.status}
                        onClick={() =>
                            setFilterStatus(
                                filterStatus === stat.status ? "all" : stat.status
                            )
                        }
                        className={`border rounded-xl p-2.5 sm:p-3 text-left transition ${filterStatus === stat.status
                                ? "border-black bg-black text-white"
                                : "border-gray-100 bg-white hover:border-black"
                            }`}
                    >
                        <p className={`text-xl sm:text-2xl font-bold ${filterStatus === stat.status
                                ? "text-white"
                                : "text-black"
                            }`}>
                            {stat.count}
                        </p>
                        <p className={`text-[10px] sm:text-xs mt-0.5 capitalize truncate ${filterStatus === stat.status
                                ? "text-gray-300"
                                : "text-gray-400"
                            }`}>
                            {stat.status}
                        </p>
                    </button>
                ))}
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-lg space-y-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-black">
                                {editingId ? "Edit Application" : "New Application"}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-black transition"
                            >
                                <FiX />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Stacks on mobile, side by side on sm+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-widest">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) =>
                                            setFormData({ ...formData, company: e.target.value })
                                        }
                                        placeholder="Google"
                                        required
                                        className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-widest">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={(e) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                        placeholder="Frontend Developer"
                                        required
                                        className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-widest">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({ ...formData, status: e.target.value })
                                    }
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black focus:outline-none focus:border-black transition bg-gray-50"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-widest">
                                    Resume (Optional)
                                </label>
                                <select
                                    value={formData.resumeId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, resumeId: e.target.value })
                                    }
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black focus:outline-none focus:border-black transition bg-gray-50"
                                >
                                    <option value="">No resume selected</option>
                                    {resumes.map((r) => (
                                        <option key={r._id} value={r._id}>
                                            {r.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-widest">
                                    Job Description (Optional)
                                </label>
                                <textarea
                                    value={formData.jobDescription}
                                    onChange={(e) =>
                                        setFormData({ ...formData, jobDescription: e.target.value })
                                    }
                                    placeholder="Paste job description..."
                                    rows={3}
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-widest">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({ ...formData, notes: e.target.value })
                                    }
                                    placeholder="Any notes about this application..."
                                    rows={2}
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 border border-gray-100 hover:border-black text-black text-sm font-medium py-2.5 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                                >
                                    {saving ? "Saving..." : editingId ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Jobs List */}
            {filteredJobs.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-16 text-center mx-auto w-full">
                    <FiBriefcase className="text-4xl text-gray-200 mx-auto mb-4" />
                    <p className="text-sm font-medium text-black">
                        No applications found
                    </p>
                    <p className="text-xs text-gray-400 mt-1 mb-6">
                        {filterStatus === "all"
                            ? "Start tracking your job applications"
                            : `No ${filterStatus} applications`}
                    </p>
                    {filterStatus === "all" && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 w-full sm:w-auto mx-auto"
                        >
                            <FiPlus className="flex-shrink-0" /> <span className="whitespace-nowrap">Add Application</span>
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    {filteredJobs.map((job, index) => (
                        <div
                            key={job._id}
                            className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group ${index !== filteredJobs.length - 1
                                    ? "border-b border-gray-50"
                                    : ""
                                }`}
                        >
                            {/* Job Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-black truncate">
                                    {job.position}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {job.company}
                                    {job.notes && (
                                        <span className="ml-2 text-gray-300">
                                            · {job.notes}
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Status Dropdown */}
                            <select
                                value={job.status}
                                onChange={(e) =>
                                    handleStatusChange(job._id, e.target.value)
                                }
                                className={`text-xs font-medium px-3 py-1 rounded-full border cursor-pointer focus:outline-none mx-4 ${STATUS_STYLES[job.status]
                                    }`}
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </option>
                                ))}
                            </select>

                            {/* Date */}
                            <p className="text-xs text-gray-400 mr-4 hidden sm:block">
                                {new Date(job.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() => handleEdit(job)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition"
                                >
                                    <FiEdit2 className="text-sm" />
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition"
                                >
                                    <FiTrash2 className="text-sm" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobTrackerPage;