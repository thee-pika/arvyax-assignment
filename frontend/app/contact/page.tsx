"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        toast.success("Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3EFD3] to-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10 grid md:grid-cols-2 gap-10">

                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-[#13361C] mb-6">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">We’d love to hear from you. Fill out the form and we’ll get back to you as soon as possible.</p>

                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-[#13361C]" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-[#13361C]" />
                            <span>contact@yourdomain.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[#13361C]" />
                            <span>Hyderabad, Telangana, India</span>
                        </div>
                    </div>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#13361C] focus:border-[#13361C] p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#13361C] focus:border-[#13361C] p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#13361C] focus:border-[#13361C] p-2"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#13361C] hover:bg-green-900 transition"
                    >
                        Send Message <Send className="w-4 h-4 ml-2" />
                    </button>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default ContactPage;
