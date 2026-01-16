import React, { useState, useEffect } from 'react';
import Header from './components/common/Header'; 
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import EmailConfirmationPage from './components/auth/EmailConfirmationPage';
import AdminUserCreator from './components/auth/AdminUserCreator';
import NormalUserCreator from './components/auth/NormalUserCreator';
import Guess from "./components/game/Guess";
import Content from './pages/Content';
import Profile from "./pages/Profile";
import UserPanel from './user/pages/UserPanel';
import UserSettings from './user/pages/UserSettings';
import UserLeaderboard from './user/pages/UserLeaderboard';
import ThemeCustomizer from "./components/common/ThemeCustomizer";
import ResponsiveWrapper from "./components/common/ResponsiveWrapper";
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminRiddles from './admin/pages/AdminRiddles';
import AdminLocations from './admin/pages/AdminLocations';
import AdminUsers from './admin/pages/AdminUsers';
import AdminStats from './admin/pages/AdminStats';
import AdminSettings from './admin/pages/AdminSettings';
import UserDashboard from './UserDashboard';

const App = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );
    const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);

    const { t } = useTranslation();

    const setLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && savedTheme !== 'default') {
            const customColors = localStorage.getItem('customColors');
            if (customColors && savedTheme === 'custom') {
                const colors = JSON.parse(customColors);
                const root = document.documentElement;
                root.style.setProperty('--color-primary', colors.primary);
                root.style.setProperty('--color-background', colors.background);
                root.style.setProperty('--color-surface', colors.surface);
                root.style.setProperty('--color-text', colors.text);
            }
        }
    }, []);

    return (
        <ResponsiveWrapper>
            {windowSize => (
                <>
                    <Header />

                    <div className="w-full flex justify-end items-center gap-4 px-6 py-2">
                        <button
                            onClick={() => setShowThemeCustomizer(true)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                        >
                            🎨 Themes
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="
                                px-4 py-2 rounded-lg text-sm font-semibold
                                bg-sky-500 text-white
                                dark:bg-slate-700 dark:text-sky-200
                                transition
                            "
                        >
                            {darkMode ? t("ui.light") : t("ui.dark")}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 border border-sky-500 rounded-lg px-3 py-2 text-sm">
                        <span className="font-semibold">{t("ui.language")}:</span>
                        <button onClick={() => setLang("en")} className="hover:underline">EN</button>
                        <button onClick={() => setLang("pl")} className="hover:underline">PL</button>
                    </div>

                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/confirm-email" element={<EmailConfirmationPage />} />
                        <Route path="/create-admin" element={<AdminUserCreator />} />
                        <Route path="/create-user" element={<NormalUserCreator />} />
                        
                        <Route path="/" element={<Content />} />
                        <Route path="/guess" element={<Guess />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/user-panel" element={<UserPanel />} />
                        <Route path="/user-settings" element={<UserSettings />} />
                        <Route path="/leaderboard" element={<UserLeaderboard />} />

                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="riddles" element={<AdminRiddles />} />
                            <Route path="locations" element={<AdminLocations />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="stats" element={<AdminStats />} />
                            <Route path="settings" element={<AdminSettings />} />
                        </Route>

                        <Route
                            path="*"
                            element={
                                <main className="container mx-auto p-8 text-center text-red-500 text-2xl">
                                    404 - Page Not Found
                                </main>
                            }
                        />
                    </Routes>

                    <ThemeCustomizer 
                        isOpen={showThemeCustomizer} 
                        onClose={() => setShowThemeCustomizer(false)} 
                    />
                </>
            )}
        </ResponsiveWrapper>
    );
};

export default App;
