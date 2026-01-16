import React from 'react';
import { Link } from 'react-router-dom';

export default function Content() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Guessnica</h1>
      <p className="mb-6 text-gray-700">Play the daily riddle and visit your profile.</p>
      <div className="flex gap-4">
        <Link to="/guess" className="px-4 py-2 bg-sky-500 text-white rounded">Play today's riddle</Link>
        <Link to="/profile" className="px-4 py-2 border border-sky-500 rounded">Profile</Link>
      </div>
    </main>
  );
}