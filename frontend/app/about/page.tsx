"use client";

import React from "react";
import { Users, Globe, Target } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3EFD3] to-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 space-y-10">

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-[#13361C] mb-4">About Us</h1>
                    <p className="text-gray-600 text-lg">
                        We are passionate about building meaningful digital experiences that empower communities and businesses.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-[#E3EFD3] p-4 rounded-full">
                        <Target className="w-8 h-8 text-[#13361C]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-[#13361C] mb-2">Our Mission</h2>
                        <p className="text-gray-700">
                            To deliver high-quality, scalable, and impactful solutions that solve real-world problems through technology and innovation.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-[#E3EFD3] p-4 rounded-full">
                        <Globe className="w-8 h-8 text-[#13361C]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-[#13361C] mb-2">Our Vision</h2>
                        <p className="text-gray-700">
                            To become a global leader in digital innovation by fostering a culture of continuous learning, collaboration, and social impact.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-[#E3EFD3] p-4 rounded-full">
                        <Users className="w-8 h-8 text-[#13361C]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-[#13361C] mb-2">Our Team</h2>
                        <p className="text-gray-700">
                            We are a dynamic team of developers, designers, and strategists committed to crafting user-centric digital experiences with passion and precision.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
