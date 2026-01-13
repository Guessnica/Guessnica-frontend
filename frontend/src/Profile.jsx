import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setError('Failed to load profile');
                }
            } catch (err) {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleAvatarUpload = async () => {
        if (!avatar) return;

        setUploading(true);
        setError('');

        try {
            const token = localStorage.getItem('jwt');
            const formData = new FormData();
            formData.append('avatar', avatar);

            const response = await fetch('/users/me/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setUser(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
                setAvatar(null);
            } else {
                setError('Failed to upload avatar');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setUploading(false);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-sky-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="text-sky-700 dark:text-sky-300 text-xl">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50 dark:bg-slate-900">
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Profile
                    </h1>
                    <button
                        onClick={handleBackToHome}
                        className="text-sky-600 hover:text-sky-500 font-medium"
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}

                {user && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                User Profile
                            </h2>

                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <img
                                        src={user.avatarUrl || '/default-avatar.png'}
                                        alt="Avatar"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-sky-200"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                        {user.roles?.includes('Admin') ? 'Admin' : 'User'}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Display Name
                                    </label>
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-900 dark:text-white">
                                        {user.displayName || 'Not set'}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-900 dark:text-white">
                                        {user.email || 'Not set'}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Roles
                                    </label>
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-900 dark:text-white">
                                        {user.roles?.join(', ') || 'No roles'}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Member Since
                                    </label>
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-900 dark:text-white">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Update Avatar
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setAvatar(e.target.files[0])}
                                        className="hidden"
                                        id="avatar-upload"
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 cursor-pointer transition-colors"
                                    >
                                        Choose File
                                    </label>
                                    {avatar && (
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {avatar.name}
                                        </span>
                                    )}
                                    <button
                                        onClick={handleAvatarUpload}
                                        disabled={!avatar || uploading}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {uploading ? 'Uploading...' : 'Upload'}
                                    </button>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Your Statistics
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                        <div className="text-2xl font-bold text-sky-600">
                                            {user.totalScore || 0}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Score</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                        <div className="text-2xl font-bold text-sky-600">
                                            {user.riddlesAnswered || 0}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Riddles Answered</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                                        <div className="text-2xl font-bold text-sky-600">
                                            {user.averageScore || 0}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Average Score</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
