import React from 'react';
import Header from './Header'; 
import Content from './Content';
import Profile from './Profile';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Header />

            {/* Define where the routes will be rendered */}
            <Routes>
                {/* Route for the Home/Content page */}
                <Route path="/" element={<Content />} />

                {/* Route for the new Profile page */}
                <Route path="/profile" element={<Profile />} />

                {/* Optional: 404 Not Found Page */}
                <Route path="*" element={<main className="container mx-auto p-8 text-center text-red-500 text-2xl">404 - Page Not Found</main>} />
            </Routes>
        </>
    );
};

export default App;