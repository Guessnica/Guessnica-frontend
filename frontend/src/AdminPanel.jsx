import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
    const [riddleStats, setRiddleStats] = useState([]);
    const [userStats, setUserStats] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAdminData() {
            try {
                const token = localStorage.getItem('jwt');

                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const [riddlesRes, usersRes, subsRes] = await Promise.all([
                    fetch('/admin/riddles/stats', { headers }),
                    fetch('/admin/users/stats', { headers }),
                    fetch('/admin/submissions', { headers }),
                ]);

                const riddlesData = await riddlesRes.json();
                const usersData = await usersRes.json();
                const submissionsData = await subsRes.json();

                setRiddleStats(riddlesData);
                setUserStats(usersData);
                setSubmissions(submissionsData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }

        fetchAdminData();
    }, []);

    if (loading) return <div>Loading admin data...</div>;

    return (
        <div className="w-full flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

            <div className="w-full max-w-5xl mb-6">
                <h2 className="text-xl font-semibold mb-2">Riddle Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {riddleStats.map((r) => (
                        <div key={r.riddleId} className="border-2 border-sky-500 rounded-xl p-4">
                            <div className="font-semibold">{r.description}</div>
                            <div>Location: {r.shortDescription}</div>
                            <div>Times answered: {r.timesAnswered}</div>
                            <div>Average score: {r.avgScore ?? 0}</div>
                            <div>Average distance (m): {r.avgDistanceMeters ?? 0}</div>
                            <div>Average time (s): {r.avgTimeSeconds ?? 0}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-5xl mb-6">
                <h2 className="text-xl font-semibold mb-2">User Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userStats.map((u) => (
                        <div key={u.userId} className="border-2 border-green-500 rounded-xl p-4">
                            <div className="font-semibold">{u.displayName}</div>
                            <div>Riddles answered: {u.riddlesAnswered}</div>
                            <div>Total score: {u.totalScore ?? 0}</div>
                            <div>Average score: {u.averageScore ?? 0}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-5xl mb-6">
                <h2 className="text-xl font-semibold mb-2">All Submissions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-black">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-black p-2">User</th>
                                <th className="border border-black p-2">Riddle ID</th>
                                <th className="border border-black p-2">Submitted Lat</th>
                                <th className="border border-black p-2">Submitted Lng</th>
                                <th className="border border-black p-2">Distance (m)</th>
                                <th className="border border-black p-2">Time (s)</th>
                                <th className="border border-black p-2">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s, idx) => (
                                <tr key={idx} className="text-center">
                                    <td className="border border-black p-2">{s.displayName}</td>
                                    <td className="border border-black p-2">{s.riddleId}</td>
                                    <td className="border border-black p-2">{s.submittedLatitude}</td>
                                    <td className="border border-black p-2">{s.submittedLongitude}</td>
                                    <td className="border border-black p-2">{s.distanceMeters ?? 0}</td>
                                    <td className="border border-black p-2">{s.timeSeconds ?? 0}</td>
                                    <td className="border border-black p-2">{s.score ?? 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
