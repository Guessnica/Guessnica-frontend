import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';

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
