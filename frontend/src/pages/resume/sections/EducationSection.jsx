import { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";

const emptyEducation = {
    degree: "",
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
};

const EducationSection = ({ data, onChange }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    const addEducation = () => {
        onChange([...data, { ...emptyEducation }]);
        setExpandedIndex(data.length);
    };

    const removeEducation = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateEducation = (index, field, value) => {
        const updated = data.map((edu, i) =>
            i === index ? { ...edu, [field]: value } : edu
        );
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-black">
                        Education
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Add your educational background
                    </p>
                </div>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-1.5 text-xs font-medium text-black hover:underline"
                >
                    <FiPlus /> Add Education
                </button>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-100 rounded-xl">
                    <p className="text-xs text-gray-400">No education added yet</p>
                    <button
                        onClick={addEducation}
                        className="mt-2 text-xs text-black font-medium hover:underline"
                    >
                        + Add your education
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {data.map((edu, index) => (
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
                                    {edu.degree || "New Education"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {edu.school || "School/University"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeEducation(index);
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            Degree
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) =>
                                                updateEducation(index, "degree", e.target.value)
                                            }
                                            placeholder="B.Tech Computer Science"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            School
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.school}
                                            onChange={(e) =>
                                                updateEducation(index, "school", e.target.value)
                                            }
                                            placeholder="XYZ University"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            Start Date
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e) =>
                                                updateEducation(index, "startDate", e.target.value)
                                            }
                                            placeholder="2020"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                            End Date
                                        </label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e) =>
                                                updateEducation(index, "endDate", e.target.value)
                                            }
                                            placeholder="2024"
                                            className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        value={edu.description}
                                        onChange={(e) =>
                                            updateEducation(index, "description", e.target.value)
                                        }
                                        placeholder="Relevant coursework, achievements..."
                                        rows={3}
                                        className="w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationSection;