import React, { useState, useEffect } from 'react';
import Header from './Header'; 
import Guess from "./Guess";
import Content from './Content';
import Profile from "./Profile";
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from "./i18n";


const App = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

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

    return (
        <>
            <Header />

            <div className="w-full flex justify-end items-center gap-4 px-6 py-2">
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
                <Route path="/" element={<Content />} />
                <Route path="/guess" element={<Guess />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="*"
                    element={
                        <main className="container mx-auto p-8 text-center text-red-500 text-2xl">
                            404 - Page Not Found
                        </main>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
