import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminHeader = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    
    const mobileMenuHeightClass = isMobileMenuOpen ? 'max-h-screen' : 'max-h-0';
    const dropdownVisibilityClass = isDropdownOpen ? 'block' : 'hidden';
    const topBarClass = isMobileMenuOpen ? 'rotate-45 translate-y-0' : '';
    const middleBarClass = isMobileMenuOpen ? 'opacity-0' : '';
    const bottomBarClass = isMobileMenuOpen ? '-rotate-45 -translate-y-0' : '';

    return (
        <header>
            <nav className="bg-red-800 text-white border-b-2 border-red-600">
                <div className="container mx-auto px-4 md:flex items-center gap-6">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
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

                            <div className="hidden flex-row items-center justify-start navigation-menu-bar md:flex">
                                <Link to="/admin" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Dashboard</Link>
                                <Link to="/admin/riddles" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Riddles</Link>
                                <Link to="/admin/settings" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Settings</Link>
                                <Link to="/admin/statistics" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Statistics</Link>
                                <Link to="/admin/users" className="py-2 px-3 block rounded transition-all duration-300 ease-in-out hover:bg-amber-300">Users</Link>

                                <div className="relative text-center">
                                    <button
                                        type="button"
                                        className="dropdown-toggle py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 rounded flex items-center gap-2 w-full text-center"
                                        onClick={toggleDropdown}
                                    >
                                        <p className="text-center w-full pointer-events-none select-none">Admin</p>
                                    </button>
                                    <div className={`dropdown-menu absolute ${dropdownVisibilityClass} transition-all duration-300 ease-in-out hover:bg-amber-300 bg-red-700 text-white rounded-b-lg w-48`}>
                                        <Link to="/profile" className="block px-6 py-2">Profile</Link>
                                        <Link to="/" className="block px-6 py-2">Exit Admin</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/admin" className="py-5 px-2 text-white text-2xl font-bold">Guessnica Admin</Link>
                    </div>
                </div>
            </nav>

            <div
                id="mobile-admin-menu-dropdown"
                className={`${mobileMenuHeightClass} overflow-hidden transition-all duration-500 ease-in-out flex-col items-center justify-center bg-red-800 to-red-600 navigation-menu md:hidden`}
            >
                <Link to="/admin" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Dashboard</Link>
                <Link to="/admin/riddles" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Riddles</Link>
                <Link to="/admin/settings" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Settings</Link>
                <Link to="/admin/statistics" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Statistics</Link>
                <Link to="/admin/users" className="py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 block rounded text-center">Users</Link>

                <div className="relative text-center w-full">
                    <button
                        type="button"
                        className="dropdown-toggle py-2 px-3 transition-all duration-300 ease-in-out hover:bg-amber-300 flex items-center gap-2 w-full text-center justify-center"
                        onClick={toggleDropdown}
                    >
                        <p className="text-center w-full pointer-events-none select-none">Admin</p>
                    </button>
                    <div className={`dropdown-menu absolute ${dropdownVisibilityClass} transition-all duration-300 ease-in-out hover:bg-amber-300 bg-red-700 text-white rounded-b-lg w-48 mx-auto right-0 left-0`}>
                        <Link to="/profile" className="block px-6 py-2">Profile</Link>
                        <Link to="/" className="block px-6 py-2">Exit Admin</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
