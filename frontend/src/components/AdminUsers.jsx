import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminUsers = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('jwt');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            const response = await fetch('/admin/users', { headers });
            
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setUsers(getMockUsers());
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers(getMockUsers());
        } finally {
            setLoading(false);
        }
    };

    const getMockUsers = () => [
        {
            id: '1',
            displayName: 'PlayerOne',
            email: 'player1@example.com',
            roles: ['User'],
            isBlocked: false,
            isEmailConfirmed: true,
            createdAt: '2024-01-15T10:30:00Z',
            lastLoginAt: '2024-01-20T15:45:00Z',
            riddlesAnswered: 89,
            totalScore: 7234,
            averageScore: 81.3
        },
        {
            id: '2',
            displayName: 'GeoMaster',
            email: 'geomaster@example.com',
            roles: ['User'],
            isBlocked: false,
            isEmailConfirmed: true,
            createdAt: '2024-01-10T08:15:00Z',
            lastLoginAt: '2024-01-20T12:30:00Z',
            riddlesAnswered: 76,
            totalScore: 6892,
            averageScore: 90.7
        },
        {
            id: '3',
            displayName: 'Spammer123',
            email: 'spam@example.com',
            roles: ['User'],
            isBlocked: true,
            isEmailConfirmed: false,
            createdAt: '2024-01-18T14:20:00Z',
            lastLoginAt: '2024-01-18T16:45:00Z',
            riddlesAnswered: 2,
            totalScore: 45,
            averageScore: 22.5
        },
        {
            id: '4',
            displayName: 'Explorer',
            email: 'explore@example.com',
            roles: ['User'],
            isBlocked: false,
            isEmailConfirmed: true,
            createdAt: '2024-01-05T11:10:00Z',
            lastLoginAt: '2024-01-19T09:20:00Z',
            riddlesAnswered: 65,
            totalScore: 5234,
            averageScore: 80.5
        },
        {
            id: '5',
            displayName: 'AdminUser',
            email: 'admin@example.com',
            roles: ['Admin', 'User'],
            isBlocked: false,
            isEmailConfirmed: true,
            createdAt: '2024-01-01T00:00:00Z',
            lastLoginAt: '2024-01-20T18:00:00Z',
            riddlesAnswered: 12,
            totalScore: 890,
            averageScore: 74.2
        }
    ];

    const handleBlockUser = async (userId, block) => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            };
            
            const response = await fetch(`/admin/users/${userId}/block`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ isBlocked: block })
            });

            if (response.ok) {
                setUsers(users.map(user => 
                    user.id === userId ? { ...user, isBlocked: block } : user
                ));
            }
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        
        try {
            const token = localStorage.getItem('jwt');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            
            const response = await fetch(`/admin/users/${userId}`, {
                method: 'DELETE',
                headers
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(user => user.id));
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedUsers.length === 0) return;
        
        if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) return;
        
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            };
            
            const response = await fetch('/admin/users/bulk', {
                method: 'POST',
                headers,
                body: JSON.stringify({ userIds: selectedUsers, action })
            });

            if (response.ok) {
                await fetchUsers();
                setSelectedUsers([]);
            }
        } catch (error) {
            console.error('Error performing bulk action:', error);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.roles.includes(filterRole);
        const matchesStatus = filterStatus === 'all' || 
                            (filterStatus === 'blocked' && user.isBlocked) ||
                            (filterStatus === 'active' && !user.isBlocked);
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <div className="text-gray-700 dark:text-gray-300">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">User Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage users, roles, and permissions</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="all">All Roles</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {filteredUsers.length} users found
                        </div>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-blue-800 dark:text-blue-200">
                                {selectedUsers.length} users selected
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleBulkAction('block')}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium"
                                >
                                    Block Selected
                                </button>
                                <button
                                    onClick={() => handleBulkAction('delete')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
                                >
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.length === filteredUsers.length}
                                            onChange={handleSelectAll}
                                            className="rounded border-gray-300 dark:border-gray-600"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Statistics
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Last Login
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelectUser(user.id)}
                                                className="rounded border-gray-300 dark:border-gray-600"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {user.displayName}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </div>
                                                <div className="flex gap-1 mt-1">
                                                    {user.roles.map(role => (
                                                        <span
                                                            key={role}
                                                            className={`px-2 py-1 text-xs rounded-full ${
                                                                role === 'Admin' 
                                                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                            }`}
                                                        >
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    user.isBlocked 
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                }`}>
                                                    {user.isBlocked ? 'Blocked' : 'Active'}
                                                </span>
                                                {!user.isEmailConfirmed && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                        Email not confirmed
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                                <div>Riddles: {user.riddlesAnswered}</div>
                                                <div>Score: {user.totalScore.toLocaleString()}</div>
                                                <div>Avg: {user.averageScore.toFixed(1)}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <button
                                                onClick={() => handleBlockUser(user.id, !user.isBlocked)}
                                                className={`${
                                                    user.isBlocked 
                                                        ? 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                                                        : 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300'
                                                } mr-4`}
                                            >
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
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
                    
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No users found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
