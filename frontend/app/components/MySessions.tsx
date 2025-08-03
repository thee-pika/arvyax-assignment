import React from 'react';
import { SessionT } from '../types/interfaces/Session';
import { UserT } from '../types/interfaces/User';

import { Clock, Edit3, FileText, Tag, Trash2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

interface MySessionsProps {
    user: UserT;
    setCurrentView: (view: string) => void;
    setEditingSession: (session: SessionT | null) => void;
}

const MySessions: React.FC<MySessionsProps> = ({ setCurrentView, setEditingSession }) => {
    const { user } = useAuth();
    const router = useRouter();
    const userSessions: any[] = [];
    const handleEdit = (session: SessionT) => {
        setEditingSession(session);
        setCurrentView('session-editor');
    };

    const handleDelete = (sessionId: string) => {
        if (window.confirm('Are you sure you want to delete this session?')) {

            window.location.reload();
        }
    };

    if (!user) {
        router.push('/auth/login');
        
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3EFD3] to-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#13361C] mb-2">My Sessions</h1>
                    <p className="text-lg text-gray-600">
                        Manage your wellness sessions and drafts
                    </p>
                </div>

                {userSessions.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-[#E3EFD3] rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-[#13361C]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#13361C] mb-2">No Sessions Yet</h3>
                            <p className="text-gray-600 mb-6">
                                You haven't created any sessions yet. Start your wellness journey by creating your first session!
                            </p>
                            <button
                                onClick={() => setCurrentView('session-editor')}
                                className="bg-[#13361C] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                            >
                                Create First Session
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userSessions.map((session) => (
                            <div key={session.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold text-[#13361C] flex-1 mr-2">{session.title}</h3>
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${session.isDraft
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                                }`}
                                        >
                                            {session.isDraft ? 'Draft' : 'Published'}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Clock size={16} className="mr-2" />
                                        <span>Updated {new Date(session.updatedAt).toLocaleDateString()}</span>
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

                                {session.jsonUrl && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Session Data:</p>
                                        <a
                                            href={session.jsonUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#13361C] hover:underline text-sm break-all"
                                        >
                                            {session.jsonUrl}
                                        </a>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-100 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(session)}
                                        className="flex items-center space-x-2 bg-[#13361C] text-white px-3 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm flex-1 justify-center"
                                    >
                                        <Edit3 size={16} />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(session.id)}
                                        className="flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySessions;