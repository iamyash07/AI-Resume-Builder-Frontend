import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResumeById, createResume, updateResume } from "../../services/resumeService";
import toast from "react-hot-toast";
import { FiSave, FiArrowLeft } from "react-icons/fi";

// Sections
import PersonalInfoSection from "./sections/PersonalInfoSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";

// Initial empty resume data
const initialResumeData = {
    title: "Untitled Resume",
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
};

const ResumeBuilderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [resumeData, setResumeData] = useState(initialResumeData);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState("personal");

    const sections = [
        { id: "personal", label: "Personal Info" },
        { id: "summary", label: "Summary" },
        { id: "experience", label: "Experience" },
        { id: "education", label: "Education" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
    ];

    useEffect(() => {
        if (isEditing) {
            fetchResume();
        }
    }, [id]);

    const fetchResume = async () => {
        setLoading(true);
        try {
            const res = await getResumeById(id);
            setResumeData(res.data.data.resume);
        } catch (error) {
            toast.error("Failed to load resume");
            navigate("/resume");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (isEditing) {
                await updateResume(id, resumeData);
                toast.success("Resume saved!");
            } else {
                const res = await createResume(resumeData);
                toast.success("Resume created!");
                navigate(`/resume/${res.data.data.resume._id}`);
            }
        } catch (error) {
            toast.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const updateSection = (section, data) => {
        setResumeData((prev) => ({ ...prev, [section]: data }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/resume")}
                        className="p-2 hover:bg-gray-50 rounded-xl transition text-gray-400 hover:text-black"
                    >
                        <FiArrowLeft />
                    </button>
                    <div>
                        <input
                            type="text"
                            value={resumeData.title}
                            onChange={(e) =>
                                setResumeData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            className="text-xl font-semibold text-black bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded-lg transition w-64"
                        />
                        <p className="text-xs text-gray-400 px-2">
                            {isEditing ? "Editing resume" : "New resume"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
                >
                    <FiSave className="text-sm" />
                    {saving ? "Saving..." : "Save Resume"}
                </button>
            </div>

            {/* Section Tabs */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl overflow-x-auto">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                            activeSection === section.id
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-400 hover:text-black"
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Active Section Content */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                {activeSection === "personal" && (
                    <PersonalInfoSection
                        data={resumeData.personalInfo}
                        onChange={(data) => updateSection("personalInfo", data)}
                    />
                )}
                {activeSection === "summary" && (
                    <SummarySection
                        data={resumeData.summary}
                        skills={resumeData.skills}
                        onChange={(data) => updateSection("summary", data)}
                    />
                )}
                {activeSection === "experience" && (
                    <ExperienceSection
                        data={resumeData.experience}
                        onChange={(data) => updateSection("experience", data)}
                    />
                )}
                {activeSection === "education" && (
                    <EducationSection
                        data={resumeData.education}
                        onChange={(data) => updateSection("education", data)}
                    />
                )}
                {activeSection === "skills" && (
                    <SkillsSection
                        data={resumeData.skills}
                        onChange={(data) => updateSection("skills", data)}
                    />
                )}
                {activeSection === "projects" && (
                    <ProjectsSection
                        data={resumeData.projects}
                        onChange={(data) => updateSection("projects", data)}
                    />
                )}
            </div>
        </div>
    );
};

export default ResumeBuilderPage;