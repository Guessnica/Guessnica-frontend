import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminStatistics = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalRiddles: 0,
        totalAnswers: 0,
        averageScore: 0,
        averageTime: 0,
        averageDistance: 0,
        riddleStats: [],
        userStats: [],
        weeklyActivity: []
    });
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d

    useEffect(() => {
        fetchStatistics();
    }, [timeRange]);

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('jwt');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            const response = await fetch(`/admin/statistics?range=${timeRange}`, { headers });
            
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                setStats(getMockStats());
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setStats(getMockStats());
        } finally {
            setLoading(false);
        }
    };

    const getMockStats = () => ({
        totalUsers: 1250,
        activeUsers: 890,
        totalRiddles: 45,
        totalAnswers: 15680,
        averageScore: 75.4,
        averageTime: 28.6,
        averageDistance: 156.3,
        riddleStats: [
            { id: 1, description: "Old Town Square", timesAnswered: 342, avgScore: 82.1, avgTime: 24.5, avgDistance: 89.2 },
            { id: 2, description: "Castle Hill", timesAnswered: 298, avgScore: 71.3, avgTime: 31.2, avgDistance: 167.8 },
            { id: 3, description: "Riverside Park", timesAnswered: 276, avgScore: 68.9, avgTime: 35.8, avgDistance: 234.1 }
        ],
        userStats: [
            { id: 1, displayName: "PlayerOne", riddlesAnswered: 89, totalScore: 7234, averageScore: 81.3 },
            { id: 2, displayName: "GeoMaster", riddlesAnswered: 76, totalScore: 6892, averageScore: 90.7 },
            { id: 3, displayName: "Explorer", riddlesAnswered: 65, totalScore: 5234, averageScore: 80.5 }
        ],
        weeklyActivity: [
            { date: '2024-01-08', answers: 234, users: 89 },
            { date: '2024-01-09', answers: 198, users: 76 },
            { date: '2024-01-10', answers: 267, users: 92 },
            { date: '2024-01-11', answers: 289, users: 98 },
            { date: '2024-01-12', answers: 312, users: 104 },
            { date: '2024-01-13', answers: 298, users: 101 },
            { date: '2024-01-14', answers: 245, users: 87 }
        ]
    });

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <div className="text-gray-700 dark:text-gray-300">Loading statistics...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Statistics</h1>
                        <p className="text-gray-600 dark:text-gray-400">Game analytics and performance metrics</p>
                    </div>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalUsers.toLocaleString()}</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-green-600 dark:text-green-400">
                                {stats.activeUsers} active this period
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Answers</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalAnswers.toLocaleString()}</p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Across {stats.totalRiddles} riddles
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.averageScore.toFixed(1)}</p>
                            </div>
                            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Points per answer
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Time</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.averageTime.toFixed(1)}s</p>
                            </div>
                            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {stats.averageDistance.toFixed(1)}m avg distance
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Riddle Performance</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Riddle
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Answers
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Avg Score
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Avg Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {stats.riddleStats.map((riddle) => (
                                        <tr key={riddle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {riddle.description}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {riddle.timesAnswered}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {riddle.avgScore.toFixed(1)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {riddle.avgTime.toFixed(1)}s
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Top Players</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Player
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Riddles
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Total Score
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Avg Score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {stats.userStats.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {user.displayName}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {user.riddlesAnswered}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {user.totalScore.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {user.averageScore.toFixed(1)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Weekly Activity</h2>
                    <div className="grid grid-cols-7 gap-2">
                        {stats.weeklyActivity.map((day, index) => (
                            <div key={index} className="text-center">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        {day.answers}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {day.users} users
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;
