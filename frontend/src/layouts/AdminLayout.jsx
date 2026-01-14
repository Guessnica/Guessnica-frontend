import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRiddles from '../pages/admin/AdminRiddles';
import AdminLocations from '../pages/admin/AdminLocations';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminStats from '../pages/admin/AdminStats';
import AdminSettings from '../pages/admin/AdminSettings';
import UserDashboard from '../UserDashboard';

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-slate-100">
            <AdminHeader />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
