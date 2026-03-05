import { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";

const emptyProject = {
    title: "",
    description: "",
    techStack: [],
    liveLink: "",
    githubLink: "",
};

const ProjectsSection = ({ data, onChange }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [techInput, setTechInput] = useState("");

    const addProject = () => {
        onChange([...data, { ...emptyProject }]);
        setExpandedIndex(data.length);
    };

    const removeProject = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateProject = (index, field, value) => {
        const updated = data.map((proj, i) =>
            i === index ? { ...proj, [field]: value } : proj
        );
        onChange(updated);
    };

    const addTech = (index) => {
        const tech = techInput.trim();
        if (!tech) return;
        const updated = data.map((proj, i) => {
            if (i === index && !proj.techStack.includes(tech)) {
                return { ...proj, techStack: [...proj.techStack, tech] };
            }
            return proj;
        });
        onChange(updated);
        setTechInput("");
    };

    const removeTech = (projIndex, techIndex) => {
        const updated = data.map((proj, i) => {
            if (i === projIndex) {
                return {
                    ...proj,
                    techStack: proj.techStack.filter((_, j) => j !== techIndex),
                };
            }
            return proj;
        });
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-black">Projects</h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Showcase your best work
                    </p>
                </div>
                <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 text-xs font-medium text-black hover:underline"
                >
                    <FiPlus /> Add Project
                </button>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-100 rounded-xl">
                    <p className="text-xs text-gray-400">No projects added yet</p>
                    <button
                        onClick={addProject}
                        className="mt-2 text-xs text-black font-medium hover:underline"
                    >
                        + Add your first project
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {data.map((proj, index) => (
                    <div
                        key={index}
                        className="border border-gray-100 rounded-xl overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
                            onClick={() =>
                                setExpandedIndex(expandedIndex === index ? null : index)
                            }
                        >
                            <div>
                                <p className="text-sm font-medium text-black">
                                    {proj.title || "New Project"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {proj.techStack.join(", ") || "No tech added"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeProject(index);
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

                        {expandedIndex === index && (
                            <div className="p-4 border-t border-gray-50 space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                        Project Title
                                    </label>
                                    <input
                                        type="text"
                                        value={proj.title}
                                        onChange={(e) =>
                                            updateProject(index, "title", e.target.value)
                                        }
                                        placeholder="AI Resume Builder"
                                        className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                        Description
                                    </label>
                                    <textarea
                                        value={proj.description}
                                        onChange={(e) =>
                                            updateProject(index, "description", e.target.value)
                                        }
                                        placeholder="Brief description of the project..."
                                        rows={3}
                                        className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                        Tech Stack
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addTech(index);
                                                }
                                            }}
                                            placeholder="React, Node.js..."
                                            className="flex-1 px-3 py-2 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                        <button
                                            onClick={() => addTech(index)}
                                            className="bg-black hover:bg-gray-800 text-white text-xs font-medium px-3 py-2 rounded-xl transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {proj.techStack.map((tech, techIndex) => (
                                            <div
                                                key={techIndex}
                                                className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg"
                                            >
                                                <span className="text-xs text-black">{tech}</span>
                                                <button
                                                    onClick={() => removeTech(index, techIndex)}
                                                    className="text-gray-300 hover:text-black transition"
                                                >
                                                    <FiX className="text-xs" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            Live Link
                                        </label>
                                        <input
                                            type="text"
                                            value={proj.liveLink}
                                            onChange={(e) =>
                                                updateProject(index, "liveLink", e.target.value)
                                            }
                                            placeholder="https://myproject.com"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            GitHub Link
                                        </label>
                                        <input
                                            type="text"
                                            value={proj.githubLink}
                                            onChange={(e) =>
                                                updateProject(index, "githubLink", e.target.value)
                                            }
                                            placeholder="github.com/user/project"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsSection;