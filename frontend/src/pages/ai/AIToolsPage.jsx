import { useState, useEffect } from "react";
import { getAllResumes } from "../../services/resumeService";
import {
    generateSummary,
    generateBullets,
    reviewResume,
    matchJob,
    generateInterviewQuestions,
} from "../../services/aiService";
import toast from "react-hot-toast";
import {
    FiCpu,
    FiFileText,
    FiTarget,
    FiMessageSquare,
    FiZap,
} from "react-icons/fi";

const AIToolsPage = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState("");
    const [activeTab, setActiveTab] = useState("summary");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Summary state
    const [targetRole, setTargetRole] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("Entry level");

    // Bullets state
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");

    // Job match state
    const [jobDescription, setJobDescription] = useState("");

    // Interview state
    const [interviewRole, setInterviewRole] = useState("");
    const [interviewCompany, setInterviewCompany] = useState("");

    const tabs = [
        { id: "summary", label: "Summary", icon: FiFileText },
        { id: "bullets", label: "Bullets", icon: FiZap },
        { id: "review", label: "Review", icon: FiCpu },
        { id: "match", label: "Job Match", icon: FiTarget },
        { id: "interview", label: "Interview", icon: FiMessageSquare },
    ];

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await getAllResumes();
            setResumes(res.data.data.resumes);
            if (res.data.data.resumes.length > 0) {
                setSelectedResume(res.data.data.resumes[0]._id);
            }
        } catch (error) {
            toast.error("Failed to load resumes");
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setResult(null);
    };

    // ── Generate Summary ──
    const handleGenerateSummary = async () => {
        if (!targetRole) {
            toast.error("Please enter a target role!");
            return;
        }
        setLoading(true);
        try {
            const res = await generateSummary({
                targetRole,
                skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
                experience,
            });
            setResult({ type: "summary", data: res.data.data.summary });
            toast.success("Summary generated!");
        } catch (error) {
            toast.error("Failed to generate summary");
        } finally {
            setLoading(false);
        }
    };

    // ── Generate Bullets ──
    const handleGenerateBullets = async () => {
        if (!jobTitle || !company) {
            toast.error("Please enter job title and company!");
            return;
        }
        setLoading(true);
        try {
            const res = await generateBullets({ jobTitle, company });
            setResult({ type: "bullets", data: res.data.data.bullets });
            toast.success("Bullets generated!");
        } catch (error) {
            toast.error("Failed to generate bullets");
        } finally {
            setLoading(false);
        }
    };

    // ── Review Resume ──
    const handleReviewResume = async () => {
        if (!selectedResume) {
            toast.error("Please select a resume!");
            return;
        }
        setLoading(true);
        try {
            const res = await reviewResume({ resumeId: selectedResume });
            setResult({ type: "review", data: res.data.data.review });
            toast.success("Resume reviewed!");
        } catch (error) {
            toast.error("Failed to review resume");
        } finally {
            setLoading(false);
        }
    };

    // ── Match Job ──
    const handleMatchJob = async () => {
        if (!selectedResume || !jobDescription) {
            toast.error("Please select a resume and enter job description!");
            return;
        }
        setLoading(true);
        try {
            const res = await matchJob({
                resumeId: selectedResume,
                jobDescription,
            });
            setResult({ type: "match", data: res.data.data.matchResult });
            toast.success("Job matched!");
        } catch (error) {
            toast.error("Failed to match job");
        } finally {
            setLoading(false);
        }
    };

    // ── Interview Questions ──
    const handleInterviewQuestions = async () => {
        if (!interviewRole) {
            toast.error("Please enter a job title!");
            return;
        }
        setLoading(true);
        try {
            const res = await generateInterviewQuestions({
                jobTitle: interviewRole,
                company: interviewCompany,
            });
            setResult({ type: "interview", data: res.data.data.questions });
            toast.success("Questions generated!");
        } catch (error) {
            toast.error("Failed to generate questions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl space-y-8">

            {/* Header */}
            <div className="border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-semibold text-black">
                    AI Tools
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Supercharge your resume with AI assistance
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                            activeTab === tab.id
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-400 hover:text-black"
                        }`}
                    >
                        <tab.icon className="text-sm" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Input Panel */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">

                    {/* Resume Selector (for review & match) */}
                    {(activeTab === "review" || activeTab === "match") && (
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                Select Resume
                            </label>
                            <select
                                value={selectedResume}
                                onChange={(e) => setSelectedResume(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black focus:outline-none focus:border-black transition bg-gray-50"
                            >
                                {resumes.length === 0 && (
                                    <option>No resumes found</option>
                                )}
                                {resumes.map((resume) => (
                                    <option key={resume._id} value={resume._id}>
                                        {resume.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Summary Tab */}
                    {activeTab === "summary" && (
                        <>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Target Role
                                </label>
                                <input
                                    type="text"
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    placeholder="e.g. Full Stack Developer"
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Skills (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="React, Node.js, MongoDB"
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Experience Level
                                </label>
                                <select
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black focus:outline-none focus:border-black transition bg-gray-50"
                                >
                                    <option>Entry level</option>
                                    <option>Mid level</option>
                                    <option>Senior level</option>
                                </select>
                            </div>
                            <button
                                onClick={handleGenerateSummary}
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                            >
                                {loading ? "Generating..." : "Generate Summary"}
                            </button>
                        </>
                    )}

                    {/* Bullets Tab */}
                    {activeTab === "bullets" && (
                        <>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="Frontend Developer"
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Google"
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                />
                            </div>
                            <button
                                onClick={handleGenerateBullets}
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                            >
                                {loading ? "Generating..." : "Generate Bullets"}
                            </button>
                        </>
                    )}

                    {/* Review Tab */}
                    {activeTab === "review" && (
                        <button
                            onClick={handleReviewResume}
                            disabled={loading}
                            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                        >
                            {loading ? "Reviewing..." : "Review Resume"}
                        </button>
                    )}

                    {/* Match Tab */}
                    {activeTab === "match" && (
                        <>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Job Description
                                </label>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here..."
                                    rows={6}
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 resize-none"
                                />
                            </div>
                            <button
                                onClick={handleMatchJob}
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                            >
                                {loading ? "Analyzing..." : "Analyze Match"}
                            </button>
                        </>
                    )}

                    {/* Interview Tab */}
                    {activeTab === "interview" && (
                        <>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={interviewRole}
                                    onChange={(e) => setInterviewRole(e.target.value)}
                                    placeholder="Full Stack Developer"
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                    Company (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={interviewCompany}
                                    onChange={(e) => setInterviewCompany(e.target.value)}
                                    placeholder="Google"
                                    className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                />
                            </div>
                            <button
                                onClick={handleInterviewQuestions}
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-xl transition"
                            >
                                {loading ? "Generating..." : "Generate Questions"}
                            </button>
                        </>
                    )}
                </div>

                {/* Result Panel */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                    {!result && (
                        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                            <FiCpu className="text-4xl text-gray-200 mb-3" />
                            <p className="text-sm font-medium text-black">
                                Results will appear here
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Fill in the details and click generate
                            </p>
                        </div>
                    )}

                    {/* Summary Result */}
                    {result?.type === "summary" && (
                        <div className="space-y-4">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                Generated Summary
                            </p>
                            <p className="text-sm text-black leading-relaxed">
                                {result.data}
                            </p>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(result.data);
                                    toast.success("Copied to clipboard!");
                                }}
                                className="text-xs text-black font-medium hover:underline"
                            >
                                Copy to clipboard
                            </button>
                        </div>
                    )}

                    {/* Bullets Result */}
                    {result?.type === "bullets" && (
                        <div className="space-y-4">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                Generated Bullets
                            </p>
                            <ul className="space-y-3">
                                {result.data.map((bullet, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-gray-300 mt-0.5">•</span>
                                        <p className="text-sm text-black leading-relaxed">
                                            {bullet}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Review Result */}
                    {result?.type === "review" && (
                        <div className="space-y-5">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                Resume Review
                            </p>

                            {/* Score */}
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-black">
                                        {result.data.score}
                                    </p>
                                    <p className="text-xs text-gray-400">Score</p>
                                </div>
                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-black rounded-full h-2 transition-all"
                                        style={{ width: `${result.data.score}%` }}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-black">
                                        {result.data.atsScore}
                                    </p>
                                    <p className="text-xs text-gray-400">ATS</p>
                                </div>
                            </div>

                            {/* Feedback */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {result.data.overallFeedback}
                            </p>

                            {/* Strengths */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                                    Strengths
                                </p>
                                <ul className="space-y-1.5">
                                    {result.data.strengths.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-gray-300 text-xs mt-1">✓</span>
                                            <p className="text-xs text-black">{s}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Improvements */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                                    Improvements
                                </p>
                                <ul className="space-y-1.5">
                                    {result.data.improvements.map((imp, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-gray-300 text-xs mt-1">→</span>
                                            <p className="text-xs text-black">{imp}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Match Result */}
                    {result?.type === "match" && (
                        <div className="space-y-5">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                Job Match Analysis
                            </p>

                            {/* Match Score */}
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-black">
                                        {result.data.matchPercentage}%
                                    </p>
                                    <p className="text-xs text-gray-400">Match</p>
                                </div>
                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-black rounded-full h-2 transition-all"
                                        style={{ width: `${result.data.matchPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Matched Skills */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                                    Matched Skills
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {result.data.matchedSkills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-black"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Missing Skills */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                                    Missing Skills
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {result.data.missingSkills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-400"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                                    Suggestions
                                </p>
                                <ul className="space-y-1.5">
                                    {result.data.suggestions.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-gray-300 text-xs mt-1">→</span>
                                            <p className="text-xs text-black">{s}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Interview Result */}
                    {result?.type === "interview" && (
                        <div className="space-y-5 overflow-y-auto max-h-96">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                                Interview Questions
                            </p>

                            {["technical", "behavioral", "situational"].map((category) => (
                                <div key={category}>
                                    <p className="text-xs font-semibold text-black uppercase tracking-widest mb-3">
                                        {category}
                                    </p>
                                    <div className="space-y-3">
                                        {result.data[category]?.map((q, i) => (
                                            <div
                                                key={i}
                                                className="border border-gray-100 rounded-xl p-3 space-y-1"
                                            >
                                                <p className="text-xs font-medium text-black">
                                                    {q.question}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    💡 {q.tip}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIToolsPage;