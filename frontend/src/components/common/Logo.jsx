import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

const Logo = ({ size = "default" }) => {
    const sizes = {
        small: { icon: "text-lg", text: "text-sm" },
        default: { icon: "text-xl", text: "text-base" },
        large: { icon: "text-3xl", text: "text-2xl" },
    };

    return (
        <Link
            to="/"
            className="flex items-center gap-2 w-fit"
        >
            <div className="bg-black p-1.5 rounded-lg">
                <FiFileText className={`text-white ${sizes[size].icon}`} />
            </div>
            <span className={`font-semibold text-black ${sizes[size].text} tracking-tight`}>
                ResumeAI
            </span>
        </Link>
    );
};

export default Logo;