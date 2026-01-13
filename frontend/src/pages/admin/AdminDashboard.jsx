import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch("/admin/stats", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}` 
            }
        })
            .then(r => r.json())
            .then(setStats);
    }, []);

    if (!stats) return null;

    const Tile = ({ label, value }) => (
        <div className="bg-gray-50 border border-sky-400 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-sky-700">
                {value}
            </div>
            <div className="text-sm text-gray-600 mt-1">
                {label}
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-sky-700">
                Admin Dashboard
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Tile label="Users" value={stats.totalUsers} />
                <Tile label="Games" value={stats.totalGames} />
                <Tile label="Answers" value={stats.totalAnswers} />
                <Tile label="Avg score" value={stats.avgScore} />
            </div>
        </div>
    );
}
