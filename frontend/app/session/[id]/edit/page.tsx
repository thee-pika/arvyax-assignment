
"use client";
import useAuth from '@/app/hooks/useAuth';
import sessionService from '@/app/services/Session';
import { SessionT } from '@/app/types/interfaces/Session';
import { Toaster } from '@/components/ui/sonner';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const EditSession = () => {
    const { token, user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState('');
    const [jsonFile, setJsonFile] = useState<File | null>(null);
    const [jsonFileUrl, setJsonFileUrl] = useState<string | null>(null);

    const uploadJsonAndGetUrl = async () => {
        if (!jsonFile) {
            toast.error('Please select a JSON file');
            return null;
        }

        const formData = new FormData();
        formData.append('file', jsonFile);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/session/upload-file`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            return res.data;
        } catch {
            toast.error('Failed to upload JSON file');
            return null;
        }
    };

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                setLoading(true)
                const res = await sessionService.getSession(token, id);
                const fetchedSession: SessionT = res.data.session;

                if (!fetchedSession.json_file_url) {
                    setLoading(false);
                    return;
                }
                setTitle(fetchedSession.title);
                const sessionTags = fetchedSession.tags;
                setTags(sessionTags.join(', '));
                setJsonFileUrl(fetchedSession.json_file_url);
            } catch (err) {
                console.error(err);

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

    const handleSave = async (isDraft: boolean) => {

        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        let fileUrl = jsonFileUrl;

        if (jsonFile) {

            const uploadRes = await uploadJsonAndGetUrl();
            if (uploadRes && uploadRes.fileUrl) {
                fileUrl = uploadRes.fileUrl;
            }
        }

        const sessionPayload = {
            title: title.trim(),
            tags: tags.split(',').map(tag => tag.trim()),
            json_file_url: fileUrl,
            status: isDraft ? 'DRAFT' : 'PUBLISHED'
        };

        try {
            const res = await sessionService.updateSession(token, id, sessionPayload);

            if (res.data.success) {
                toast.success('Session saved successfully');
                router.push('/session/my');
            }

        } catch {
            toast.error('Failed to save session');
        } finally {
            setLoading(true)
        }
    };

    const handleCancel = () => {
        if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
            router.push('/session/my');
        } else {
            router.push('/session/my');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3EFD3] to-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#13361C] mb-2">
                        Update Session
                    </h1>
                    <p className="text-lg text-gray-600">Upload your JSON session file</p>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#13361C] mb-2">Session Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#13361C]"
                            placeholder="Enter session title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#13361C] mb-2">Tags</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => { setTags(e.target.value) }}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#13361C]"
                            placeholder="e.g., yoga, meditation"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#13361C] mb-2">Upload JSON File *</label>
                        <input
                            type="file"
                            accept="application/json"
                            onChange={(e) => setJsonFile(e.target.files ? e.target.files[0] : null)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#13361C]"
                        />
                    </div>

                    <div className="pt-6 border-t flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => handleSave(true)}
                            disabled={!title.trim()}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"
                        >

                            <span>Save as Draft</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSave(false)}
                            disabled={!title.trim()}
                            className="bg-[#13361C] text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 flex-1"
                        >
                            <span>Save and Publish Session</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default EditSession;