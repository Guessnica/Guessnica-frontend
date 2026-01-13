import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminRiddles = () => {
    const { t } = useTranslation();
    const [riddles, setRiddles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingRiddle, setEditingRiddle] = useState(null);
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        shortDescription: '',
        difficulty: 'medium',
        image: null
    });

    useEffect(() => {
        fetchRiddles();
    }, []);

    const fetchRiddles = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            const response = await fetch('/locations', { headers });
            if (response.ok) {
                const data = await response.json();
                setRiddles(data);
            }
        } catch (error) {
            console.error('Error fetching riddles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            const formDataObj = new FormData();
            formDataObj.append('Latitude', parseFloat(formData.latitude));
            formDataObj.append('Longitude', parseFloat(formData.longitude));
            formDataObj.append('ShortDescription', formData.shortDescription);
            if (formData.image) {
                formDataObj.append('Image', formData.image);
            }

            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            if (editingRiddle) {
                const response = await fetch(`/locations/${editingRiddle.id}`, {
                    method: 'PUT',
                    headers,
                    body: formDataObj
                });
                
                if (response.ok) {
                    await fetchRiddles();
                    resetForm();
                }
            } else {
                const response = await fetch('/locations', {
                    method: 'POST',
                    headers,
                    body: formDataObj
                });
                
                if (response.ok) {
                    await fetchRiddles();
                    resetForm();
                }
            }
        } catch (error) {
            console.error('Error saving riddle:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this riddle?')) return;
        
        try {
            const token = localStorage.getItem('jwt');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            const response = await fetch(`/locations/${id}`, {
                method: 'DELETE',
                headers
            });
            
            if (response.ok) {
                await fetchRiddles();
            }
        } catch (error) {
            console.error('Error deleting riddle:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            latitude: '',
            longitude: '',
            shortDescription: '',
            difficulty: 'medium',
            image: null
        });
        setShowAddForm(false);
        setEditingRiddle(null);
    };

    const startEdit = (riddle) => {
        setEditingRiddle(riddle);
        setFormData({
            latitude: riddle.latitude.toString(),
            longitude: riddle.longitude.toString(),
            shortDescription: riddle.shortDescription || '',
            difficulty: riddle.difficulty || 'medium',
            image: null
        });
        setShowAddForm(true);
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <div className="text-gray-700 dark:text-gray-300">Loading riddles...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Riddles Management</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Add New Riddle
                    </button>
                </div>

                {showAddForm && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            {editingRiddle ? 'Edit Riddle' : 'Add New Riddle'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Latitude
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={formData.latitude}
                                        onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Longitude
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={formData.longitude}
                                        onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    required
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    rows="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Difficulty
                                </label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Image {!editingRiddle && '(required)'}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required={!editingRiddle}
                                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
                                >
                                    {editingRiddle ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Coordinates
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {riddles.map((riddle) => (
                                    <tr key={riddle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {riddle.imageUrl && (
                                                <img 
                                                    src={riddle.imageUrl} 
                                                    alt={riddle.shortDescription}
                                                    className="h-16 w-16 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {riddle.shortDescription}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {riddle.latitude?.toFixed(6)}, {riddle.longitude?.toFixed(6)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                riddle.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                riddle.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {riddle.difficulty || 'medium'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => startEdit(riddle)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(riddle.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {riddles.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No riddles found. Add your first riddle to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminRiddles;
