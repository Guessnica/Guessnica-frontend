import React, { useEffect, useState } from "react";

export default function AdminRiddles() {
    const [riddles, setRiddles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRiddle, setEditingRiddle] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        difficulty: 1,
        timeLimitSeconds: 300,
        maxDistanceMeters: 1000,
        shortDescription: '',
        imageUrl: ''
    });

    const load = () => {
        setLoading(true);
        fetch("/admin/riddles", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}` 
            }
        })
            .then(r => r.json())
            .then(data => {
                setRiddles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load riddles:', err);
                setLoading(false);
            });
    };

    useEffect(load, []);

    const remove = async (id) => {
        if (!confirm("Delete this riddle?")) return;

        try {
            await fetch(`/admin/riddles/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}` 
                }
            });
            load();
        } catch (err) {
            console.error('Failed to delete riddle:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = editingRiddle ? `/admin/riddles/${editingRiddle.id}` : '/admin/riddles';
            const method = editingRiddle ? 'PUT' : 'POST';
            
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwt")}` 
                },
                body: JSON.stringify(formData)
            });
            
            setShowForm(false);
            setEditingRiddle(null);
            setFormData({
                description: '',
                difficulty: 1,
                timeLimitSeconds: 300,
                maxDistanceMeters: 1000,
                shortDescription: '',
                imageUrl: ''
            });
            load();
        } catch (err) {
            console.error('Failed to save riddle:', err);
        }
    };

    const edit = (riddle) => {
        setEditingRiddle(riddle);
        setFormData({
            description: riddle.description,
            difficulty: riddle.difficulty,
            timeLimitSeconds: riddle.timeLimitSeconds,
            maxDistanceMeters: riddle.maxDistanceMeters,
            shortDescription: riddle.shortDescription,
            imageUrl: riddle.imageUrl
        });
        setShowForm(true);
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingRiddle(null);
        setFormData({
            description: '',
            difficulty: 1,
            timeLimitSeconds: 300,
            maxDistanceMeters: 1000,
            shortDescription: '',
            imageUrl: ''
        });
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center text-gray-500">Loading riddles...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-sky-700">
                    Riddles Management
                </h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
                >
                    Add New Riddle
                </button>
            </div>

            {showForm && (
                <div className="bg-white border-2 border-sky-500 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-sky-700">
                        {editingRiddle ? 'Edit Riddle' : 'Add New Riddle'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                rows="3"
                                required
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Difficulty (1-3)
                                </label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({...formData, difficulty: parseInt(e.target.value)})}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value={1}>Easy</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Hard</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time Limit (seconds)
                                </label>
                                <input
                                    type="number"
                                    value={formData.timeLimitSeconds}
                                    onChange={(e) => setFormData({...formData, timeLimitSeconds: parseInt(e.target.value)})}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    min="30"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Max Distance (meters)
                                </label>
                                <input
                                    type="number"
                                    value={formData.maxDistanceMeters}
                                    onChange={(e) => setFormData({...formData, maxDistanceMeters: parseInt(e.target.value)})}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    min="100"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Short Description
                                </label>
                                <input
                                    type="text"
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {editingRiddle ? 'Update' : 'Create'} Riddle
                            </button>
                            <button
                                type="button"
                                onClick={cancelForm}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {riddles.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No riddles found. Create your first riddle!
                    </div>
                ) : (
                    riddles.map(r => (
                        <div
                            key={r.id}
                            className="bg-white border-2 border-sky-500 rounded-xl p-4 flex gap-4 hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={r.imageUrl}
                                alt={r.description}
                                className="w-32 h-24 object-cover rounded"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/128x96?text=No+Image';
                                }}
                            />

                            <div className="flex-1">
                                <div className="font-semibold text-lg text-gray-900">
                                    {r.description}
                                </div>

                                <div className="text-sm text-gray-600 mt-1">
                                    <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                                        Difficulty: {r.difficulty === 1 ? 'Easy' : r.difficulty === 2 ? 'Medium' : 'Hard'}
                                    </span>
                                    <span className="inline-block bg-blue-100 px-2 py-1 rounded mr-2">
                                        Time: {r.timeLimitSeconds}s
                                    </span>
                                    <span className="inline-block bg-green-100 px-2 py-1 rounded">
                                        Max Distance: {r.maxDistanceMeters}m
                                    </span>
                                </div>

                                <div className="text-sm text-gray-500 mt-2">
                                    📍 {r.shortDescription}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => edit(r)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => remove(r.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
