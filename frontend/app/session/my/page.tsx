"use client";
import useAuth from '@/app/hooks/useAuth';
import sessionService from '@/app/services/Session';
import { SessionT } from '@/app/types/interfaces/Session';
import { Calendar, Clock, PencilLine, Tag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PublishedSessions = () => {
    const [userSessions, setUserSessions] = useState<SessionT[]>([]);
    const { token, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            toast.error("Please login to continue");
            setTimeout(() => {
                router.push('/auth/login');
            }, 500)
        }
    }, [user, router]);

    const getMySessions = async () => {
        try {


            const data = await sessionService.getMySessions(token);

            const { sessions } = data.data
            setUserSessions(sessions);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getMySessions();
    }, [])

    if (!user) {
        router.push('/auth/login');
    }

    const handleDelete = async (id: string) => {
        const res = await sessionService.delete(token, id);
        if (res.data.success) {
            toast.success("Session Deleted Successfully!!");

            setTimeout(() => {
                router.push("/session/my");
                getMySessions();
            }, 1000)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3EFD3] to-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#13361C] mb-2">My Sessions</h1>
                    <p className="text-lg text-gray-600">
                        Explore wellness sessions shared by our community
                    </p>
                </div>

                {userSessions.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-[#E3EFD3] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-[#13361C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#13361C] mb-2">No Sessions Yet</h3>
                            <p className="text-gray-600">
                                All sessions will appear here. Create your first session to get started!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userSessions.map((session: SessionT) => (
                            <div key={session.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-[#13361C] mb-2">{session.title}</h3>

                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Clock size={16} className="mr-2" />
                                        <span>Created {new Date(session.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    {session.tags.length > 0 && (
                                        <div className="flex items-center flex-wrap gap-2 mb-3">
                                            <Tag size={16} className="text-gray-500" />
                                            {session.tags.map((tag: any, index: number) => (
                                                <span
                                                    key={index}
                                                    className="bg-[#E3EFD3] text-[#13361C] px-2 py-1 rounded-full text-sm font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {session.json_file_url && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Session Data:</p>
                                        <Link href={`/session/${session.id}`}>
                                            <button

                                                className="ml-2 text-sm text-green-100 hover:underline px-4 py-2 rounded-md bg-[#13361C]"
                                            >

                                                View JSON
                                            </button>
                                        </Link>

                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-100 flex justify-between" >
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {
                                            session.status === "DRAFT" ? "Draft" : "Published"
                                        }
                                    </span>
                                    <div className=''>
                                        <Link href={`/session/${session.id}/edit`}>
                                            <button
                                                className="ml-2 text-sm text-green-100 hover:underline px-4 py-2 rounded-md bg-[#13361C]"
                                            >
                                                <PencilLine />
                                            </button>
                                        </Link>
                                        <button
                                            className="ml-2 text-sm text-green-100 hover:underline px-4 py-2 rounded-md bg-[#13361C]"
                                            onClick={() => handleDelete(session.id)}
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublishedSessions;

