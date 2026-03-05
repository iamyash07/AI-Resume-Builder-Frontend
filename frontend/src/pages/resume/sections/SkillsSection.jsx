import { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";

const SkillsSection = ({ data, onChange }) => {
    const [input, setInput] = useState("");

    const addSkill = () => {
        const skill = input.trim();
        if (!skill) return;
        if (data.includes(skill)) {
            setInput("");
            return;
        }
        onChange([...data, skill]);
        setInput("");
    };

    const removeSkill = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-sm font-semibold text-black">Skills</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                    Add your technical and soft skills
                </p>
            </div>

            {/* Input */}
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                    Add Skill
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. JavaScript, React, Node.js"
                        className="flex-1 px-3 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                    />
                    <button
                        onClick={addSkill}
                        className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition"
                    >
                        <FiPlus /> Add
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                    Press Enter or comma to add quickly
                </p>
            </div>

            {/* Skills List */}
            {data.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-100 rounded-xl">
                    <p className="text-xs text-gray-400">No skills added yet</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {data.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl group"
                        >
                            <span className="text-xs font-medium text-black">
                                {skill}
                            </span>
                            <button
                                onClick={() => removeSkill(index)}
                                className="text-gray-300 hover:text-black transition"
                            >
                                <FiX className="text-xs" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillsSection;