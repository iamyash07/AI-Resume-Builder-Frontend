import { useState } from "react";
import { generateBullets } from "../../../services/aiService";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiCpu, FiChevronDown, FiChevronUp } from "react-icons/fi";

const emptyExperience = {
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    bullets: [],
};

const ExperienceSection = ({ data, onChange }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [generatingIndex, setGeneratingIndex] = useState(null);

    const addExperience = () => {
        onChange([...data, { ...emptyExperience }]);
        setExpandedIndex(data.length);
    };

    const removeExperience = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateExperience = (index, field, value) => {
        const updated = data.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        onChange(updated);
    };

    const handleGenerateBullets = async (index) => {
        const exp = data[index];
        if (!exp.jobTitle || !exp.company) {
            toast.error("Please enter job title and company first!");
            return;
        }
        setGeneratingIndex(index);
        try {
            const res = await generateBullets({
                jobTitle: exp.jobTitle,
                company: exp.company,
            });
            updateExperience(index, "bullets", res.data.data.bullets);
            toast.success("Bullets generated!");
        } catch (error) {
            toast.error("Failed to generate bullets");
        } finally {
            setGeneratingIndex(null);
        }
    };

    const updateBullet = (expIndex, bulletIndex, value) => {
        const updated = data.map((exp, i) => {
            if (i === expIndex) {
                const bullets = exp.bullets.map((b, j) =>
                    j === bulletIndex ? value : b
                );
                return { ...exp, bullets };
            }
            return exp;
        });
        onChange(updated);
    };

    const removeBullet = (expIndex, bulletIndex) => {
        const updated = data.map((exp, i) => {
            if (i === expIndex) {
                return {
                    ...exp,
                    bullets: exp.bullets.filter((_, j) => j !== bulletIndex),
                };
            }
            return exp;
        });
        onChange(updated);
    };

    const addBullet = (expIndex) => {
        const updated = data.map((exp, i) => {
            if (i === expIndex) {
                return { ...exp, bullets: [...exp.bullets, ""] };
            }
            return exp;
        });
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-black">
                        Work Experience
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Add your work history
                    </p>
                </div>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 text-xs font-medium text-black hover:underline"
                >
                    <FiPlus /> Add Experience
                </button>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-100 rounded-xl">
                    <p className="text-xs text-gray-400">
                        No experience added yet
                    </p>
                    <button
                        onClick={addExperience}
                        className="mt-2 text-xs text-black font-medium hover:underline"
                    >
                        + Add your first experience
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {data.map((exp, index) => (
                    <div
                        key={index}
                        className="border border-gray-100 rounded-xl overflow-hidden"
                    >
                        {/* Experience Header */}
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
                            onClick={() =>
                                setExpandedIndex(
                                    expandedIndex === index ? null : index
                                )
                            }
                        >
                            <div>
                                <p className="text-sm font-medium text-black">
                                    {exp.jobTitle || "New Experience"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {exp.company || "Company"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeExperience(index);
                                    }}
                                    className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition"
                                >
                                    <FiTrash2 className="text-sm" />
                                </button>
                                {expandedIndex === index ? (
                                    <FiChevronUp className="text-gray-400" />
                                ) : (
                                    <FiChevronDown className="text-gray-400" />
                                )}
                            </div>
                        </div>

                        {/* Experience Form */}
                        {expandedIndex === index && (
                            <div className="p-4 border-t border-gray-50 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.jobTitle}
                                            onChange={(e) =>
                                                updateExperience(index, "jobTitle", e.target.value)
                                            }
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
                                            value={exp.company}
                                            onChange={(e) =>
                                                updateExperience(index, "company", e.target.value)
                                            }
                                            placeholder="Google"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            Start Date
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.startDate}
                                            onChange={(e) =>
                                                updateExperience(index, "startDate", e.target.value)
                                            }
                                            placeholder="Jan 2023"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            End Date
                                        </label>
                                        <input
                                            type="text"
                                            value={exp.current ? "Present" : exp.endDate}
                                            onChange={(e) =>
                                                updateExperience(index, "endDate", e.target.value)
                                            }
                                            placeholder="Present"
                                            disabled={exp.current}
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`current-${index}`}
                                        checked={exp.current}
                                        onChange={(e) =>
                                            updateExperience(index, "current", e.target.checked)
                                        }
                                        className="rounded"
                                    />
                                    <label
                                        htmlFor={`current-${index}`}
                                        className="text-xs text-gray-500"
                                    >
                                        Currently working here
                                    </label>
                                </div>

                                {/* AI Bullets */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest">
                                            Bullet Points
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleGenerateBullets(index)}
                                                disabled={generatingIndex === index}
                                                className="flex items-center gap-1.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
                                            >
                                                <FiCpu className="text-xs" />
                                                {generatingIndex === index
                                                    ? "Generating..."
                                                    : "AI Generate"}
                                            </button>
                                            <button
                                                onClick={() => addBullet(index)}
                                                className="text-xs text-black font-medium hover:underline"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                    </div>

                                    {exp.bullets.length === 0 && (
                                        <p className="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-100 rounded-xl">
                                            No bullets yet. Generate with AI or add manually.
                                        </p>
                                    )}

                                    {exp.bullets.map((bullet, bulletIndex) => (
                                        <div
                                            key={bulletIndex}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-gray-300 mt-2.5 text-xs">•</span>
                                            <input
                                                type="text"
                                                value={bullet}
                                                onChange={(e) =>
                                                    updateBullet(index, bulletIndex, e.target.value)
                                                }
                                                placeholder="Describe your achievement..."
                                                className="flex-1 px-3 py-2 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                            />
                                            <button
                                                onClick={() => removeBullet(index, bulletIndex)}
                                                className="mt-1.5 p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition"
                                            >
                                                <FiTrash2 className="text-xs" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceSection;