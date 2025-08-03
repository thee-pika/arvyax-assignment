"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, ArrowLeft } from 'lucide-react';
import { SessionT } from '@/app/types/interfaces/Session';
import sessionService from '@/app/services/Session';
import useAuth from '@/app/hooks/useAuth';
import { toast } from 'sonner';

const SessionDataByID = () => {
    const { token, user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [session, setSession] = useState<SessionT | null>(null);
    const [sessionData, setSessionData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const res = await sessionService.getSession(token, id);
                const fetchedSession: SessionT = res.data.session;
                setSession(res.data.session);

                if (!fetchedSession.json_file_url) {
                    setError("No JSON file found for this session.");
                    setLoading(false);
                    return;
                }

                const jsonResponse = await axios.get(fetchedSession.json_file_url);
                setSessionData(jsonResponse.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch session data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSessionData();
        }

    }, [id]);

    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            setTimeout(() => {
                router.push('/auth/login');
            }, 500)
        }
    }, [user, router]);

    if (loading) {
        return <div className="p-8 text-center text-2xl">Loading...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500 text-xl">{error}</div>;
    }

    if (!session || !sessionData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3EFD3] to-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8">

                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center text-sm text-[#13361C] hover:underline mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sessions
                </button>


                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#13361C] mb-4">{session.title}</h1>


                <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created on {new Date(session.createdAt).toLocaleDateString()}
                </div>

                {session.tags.length > 0 && (
                    <div className="flex justify-center flex-wrap gap-2 mb-6">
                        {session.tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="bg-[#E3EFD3] text-[#13361C] px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="bg-gray-100 rounded-2xl shadow-inner p-6 max-h-[500px] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4 text-[#13361C] text-center">Session JSON Data</h2>
                    <pre className="text-xs md:text-sm whitespace-pre-wrap break-words leading-relaxed">
                        {JSON.stringify(sessionData, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default SessionDataByID;
