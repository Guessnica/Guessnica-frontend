// Header.jsx
import React, { useState } from 'react';
// 💡 Import Link for navigation
import { Link } from 'react-router-dom';

const Header = () => {
    // ... (State and toggle functions remain the same) ...
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
    const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };
    const mobileMenuHeightClass = isMobileMenuOpen ? 'max-h-screen' : 'max-h-0';
    const dropdownVisibilityClass = isDropdownOpen ? 'block' : 'hidden';
    const topBarClass = isMobileMenuOpen ? 'rotate-45 translate-y-0' : ''; // Adjusted y-translation for standard hamburger animation
    const middleBarClass = isMobileMenuOpen ? 'opacity-0' : '';
    const bottomBarClass = isMobileMenuOpen ? '-rotate-45 -translate-y-0' : ''; // Adjusted y-translation

    return (
        <header>
            <nav className="bg-sky-800 text-white border-b-2 border-gray-600">
                <div className="container mx-auto px-4 md:flex items-center gap-6">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center order-first">
                                <button
                                    type="button"
                                    className="mobile-menu-button p-6"
                                    onClick={toggleMobileMenu}
                                >
                                    <div className="flex flex-col justify-between w-5 h-4 transform transition-all duration-300 origin-center">
                                        <div className={`bg-current h-0.5 w-full rounded transform transition-all duration-300 origin-left ${topBarClass}`}></div>
                                        <div className={`bg-current h-0.5 w-full rounded transform transition-all duration-300 ${middleBarClass}`}></div>
                                        <div className={`bg-current h-0.5 w-full rounded transform transition-all duration-300 origin-left ${bottomBarClass}`}></div>
                                    </div>
                                </button>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden flex-row items-center justify-start navigation-menu-bar md:flex">
                                {/* 💡 Converted anchor tags to Link components */}
                                <Link to="/" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Home (Content)</Link>
                                <Link to="/guess" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Guess</Link>
                                <Link to="/profile" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Profile (New Page)</Link>

                                {/* Desktop Dropdown */}
                                <div className="relative text-center">
                                    <button
                                        type="button"
                                        className="dropdown-toggle py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 rounded flex items-center gap-2 w-full text-center"
                                        onClick={toggleDropdown}
                                    >
                                        <p className="text-center w-full pointer-events-none select-none">Dropdown</p>
                                    </button>
                                    <div className={`dropdown-menu absolute ${dropdownVisibilityClass} transition-all duration-300 ease-in-out hover:bg-amber-300 bg-sky-700 text-white rounded-b-lg w-48`}>
                                        <Link to="/settings" className="block px-6 py-2">Settings</Link>
                                    </div>
                                </div>

                                <Link to="/" className="py-2 px-3 block transition-all duration-300 ease-in-out hover:bg-amber-300 rounded">PUSTE</Link>
                            </div>
                        </div>

                        {/* Logo Link */}
                        <Link to="/" className="py-5 px-2 text-white text-2xl font-bold">Guessnica</Link>

                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                id="mobile-menu-dropdown"
                className={`${mobileMenuHeightClass} overflow-hidden transition-all duration-500 ease-in-out flex-col items-center justify-center bg-sky-800 to-blue-600 navigation-menu md:hidden`}
            >
                {/* 💡 Converted mobile anchor tags to Link components */}
                <Link to="/" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Home (Content)</Link>
                <Link to="/guess" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Guess</Link>
                <Link to="/profile" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Profile (New Page)</Link>

                {/* Mobile Dropdown */}
                <div className="relative text-center w-full">
                    <button
                        type="button"
                        className="dropdown-toggle py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 flex items-center gap-2 w-full text-center justify-center"
                        onClick={toggleDropdown}
                    >
                        <p className="text-center w-full pointer-events-none select-none">Dropdown</p>
                    </button>
                    <div className={`dropdown-menu absolute ${dropdownVisibilityClass} transition-all duration-300 ease-in-out hover:bg-amber-300 bg-sky-700 text-white rounded-b-lg w-48 mx-auto right-0 left-0`}>
                        <Link to="/settings" className="block px-6 py-2">Settings</Link>
                    </div>
                </div>

                <Link to="/" className="py-2 px-3 block text-center rounded transition-all duration-300 ease-in-out hover:bg-amber-300">PUSTE</Link>
            </div>
        </header>
    );
};

export default Header;