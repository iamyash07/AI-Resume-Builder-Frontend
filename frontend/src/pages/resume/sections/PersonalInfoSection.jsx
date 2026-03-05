import { FiUser, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiGlobe } from "react-icons/fi";

const PersonalInfoSection = ({ data, onChange }) => {
    const handleChange = (e) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/[^0-9\s\-\+]/g, "");
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length <= 10) {
            onChange({ ...data, phone: value });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-sm font-semibold text-black">
                    Personal Information
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                    Add your contact details
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Full Name */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        Full Name
                    </label>
                    <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="text"
                            name="fullName"
                            value={data.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        Email
                    </label>
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        Phone
                    </label>
                    <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="tel"
                            name="phone"
                            value={data.phone}
                            onChange={handlePhoneChange}
                            placeholder="1234567890"
                            maxLength={13}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        Max 10 digits
                    </p>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        Location
                    </label>
                    <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="text"
                            name="location"
                            value={data.location}
                            onChange={handleChange}
                            placeholder="New York, USA"
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                </div>

                {/* LinkedIn */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        LinkedIn
                    </label>
                    <div className="relative">
                        <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="text"
                            name="linkedin"
                            value={data.linkedin}
                            onChange={handleChange}
                            placeholder="linkedin.com/in/johndoe"
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                </div>

                {/* GitHub */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        GitHub
                    </label>
                    <div className="relative">
                        <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="text"
                            name="github"
                            value={data.github}
                            onChange={handleChange}
                            placeholder="github.com/johndoe"
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                </div>

                {/* Portfolio */}
                <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest">
                        Portfolio
                    </label>
                    <div className="relative">
                        <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                        <input
                            type="text"
                            name="portfolio"
                            value={data.portfolio}
                            onChange={handleChange}
                            placeholder="johndoe.com"
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-100 rounded-xl text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black transition bg-gray-50"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PersonalInfoSection;