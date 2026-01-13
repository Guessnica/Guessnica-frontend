import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminSettings = () => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState({
        riddleTime: '09:00:00',
        maxDistance: 100,
        podiumPeriod: 7,
        gameActive: true,
        allowRegistration: true,
        maxRiddlesPerDay: 5,
        pointsPerCorrectAnswer: 100,
        timeBonusEnabled: true
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('jwt');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            const response = await fetch('/admin/settings', { headers });
            
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            } else {
                console.log('Using default settings');
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            };
            
            const response = await fetch('/admin/settings', {
                method: 'PUT',
                headers,
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                setMessage('Settings saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Error saving settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <div className="text-gray-700 dark:text-gray-300">Loading settings...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Game Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400">Configure game parameters and system settings</p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        message.includes('success') 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Timing Settings</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Daily Riddle Time
                                </label>
                                <input
                                    type="time"
                                    value={settings.riddleTime}
                                    onChange={(e) => handleInputChange('riddleTime', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Time when new riddle becomes available (HH:MM)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Podium Period (days)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={settings.podiumPeriod}
                                    onChange={(e) => handleInputChange('podiumPeriod', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Number of days to display podium/leaderboard
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Game Rules</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Maximum Distance (meters)
                                </label>
                                <input
                                    type="number"
                                    min="10"
                                    max="10000"
                                    value={settings.maxDistance}
                                    onChange={(e) => handleInputChange('maxDistance', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Maximum allowed distance from correct location
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Max Riddles Per Day
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={settings.maxRiddlesPerDay}
                                    onChange={(e) => handleInputChange('maxRiddlesPerDay', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Maximum riddles a user can play per day
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Points Per Correct Answer
                                </label>
                                <input
                                    type="number"
                                    min="10"
                                    max="1000"
                                    value={settings.pointsPerCorrectAnswer}
                                    onChange={(e) => handleInputChange('pointsPerCorrectAnswer', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Base points awarded for correct answer
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">System Settings</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Game Active
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Enable or disable the game for all users
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('gameActive', !settings.gameActive)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        settings.gameActive ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            settings.gameActive ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Allow Registration
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Allow new users to register
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('allowRegistration', !settings.allowRegistration)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        settings.allowRegistration ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Time Bonus Enabled
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Award bonus points for faster answers
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('timeBonusEnabled', !settings.timeBonusEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        settings.timeBonusEnabled ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            settings.timeBonusEnabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
