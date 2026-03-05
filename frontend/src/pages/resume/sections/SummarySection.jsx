import { useState } from "react";
import { generateSummary } from "../../../services/aiService";
import toast from "react-hot-toast";
import { FiCpu } from "react-icons/fi";

const SummarySection = ({ data, skills, onChange }) => {
    const [generating, setGenerating] = useState(false);
    const [targetRole, setTargetRole] = useState("");

    const handleGenerate = async () => {
        if (!targetRole) {
            toast.error("Please enter a target role first!");
            return;
        }
        setGenerating(true);
        try {
            const res = await generateSummary({
                targetRole,
                skills,
                experience: "Entry level",
            });
            onChange(res.data.data.summary);
            toast.success("Summary generated!");
        } catch (error) {
            toast.error("Failed to generate summary");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-sm font-semibold text-black">
                    Professional Summary
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                    Write a summary or generate one with AI
                </p>
            </div>

            {/* AI Generator */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    AI Generate
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="Target role (e.g. Full Stack Developer)"
                        className="flex-1 px-3 py-2 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-white"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="flex items-center gap-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-xs font-medium px-4 py-2 rounded-xl transition whitespace-nowrap"
                    >
                        <FiCpu className="text-sm" />
                        {generating ? "Generating..." : "Generate"}
                    </button>
                </div>
            </div>

            {/* Summary Textarea */}
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                    Summary
                </label>
                <textarea
                    value={data}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write your professional summary here..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50 resize-none"
                />
            </div>
        </div>
    );
};

export default SummarySection;