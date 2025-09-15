// src/components/Navbar.tsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
    faHome,
    faUser,
    faMapMarkerAlt,
    faStar,
    faServer,
    faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface NavbarProps {
    brandName?: string;
    loginText?: string;
    logoutText?: string;
    signupText?: string;

    menuTitle?: string;
    copyrightText?: string;
    mainLinks?: string[];
    subLinks?: Record<string, { name: string; path: string }[]>;
}
const mainLinkIcons: Record<string, unknown> = {
    Home: faHome,
    User: faUser,
    Loaction: faMapMarkerAlt,
    Points: faStar,
    Installiation: faServer,
    Map: faMap,
};
export default function Navbar({
    brandName = "Fiber",
    loginText = "Login",
    logoutText = "Logout",
    signupText = "Signup",
    menuTitle = "Navigation Menu",
    copyrightText = "© 2025 Our Brand",
    mainLinks = [
        "Home",
        "User",
        "Loaction",
        "Points",
        "Customers",
        "Installiation",
        "Map",
        // "About", // will add later
        // "Contact",
        // "Support",
    ],
    subLinks = {
        User: [
            { name: "User List", path: "/user-list" },
            // { name: "Customers", path: "/customer-list" },
            // { name: "API", path: "/products/api" },
            // { name: "Integrations", path: "/products/integrations" }
        ],
        Points: [{ name: "Points List", path: "/point-list" }],
        Loaction: [
            { name: "Loaction List", path: "/location-list" },
            { name: "Loaction info setup", path: "/Loaction-info-setup" },
            // { name: "Training", path: "/services/training" },
            // { name: "Support", path: "/services/support" }
        ],
        Installiation: [{ name: "Main Installination", path: "/services/Installination" }],
        Map: [{ name: "Main Cable Map", path: "/map" }],

        // Docs: [
        //     { name: "Getting Started", path: "/docs/getting-started" },
        //     { name: "API Reference", path: "/docs/api" },
        //     { name: "Examples", path: "/docs/examples" },
        //     { name: "Tutorials", path: "/docs/tutorials" },
        // ],
    },
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const location = useLocation();

    // Function to handle navigation and close the mobile menu
    const handleNavigation = () => {
        setIsOpen(false);
        setActiveIndex(null);
    };

    // Generate paths for main links (simple lowercase conversion for demo)
    const getMainLinkPath = (link: string) => {
        return `/${link.toLowerCase().replace(/\s+/g, "-")}`;
    };
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <div className="navbar bg-gradient-to-r from-[#2dbee2] to-[#1b8406] text-white shadow-lg px-4 py-3">
            {/* Left Hamburger Button */}
            <div className="flex-none">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-circle btn-ghost hover:bg-white/20 transition-all duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Enhanced Logo/Brand section */}
            <div className="flex-1 ml-4 flex items-center">
                <Link
                    to="/"
                    className="flex items-center space-x-2 group"
                    onClick={handleNavigation}
                >
                    {/* Animated logo icon */}
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        {/* Pulsing animation effect */}
                        <div className="absolute inset-0 rounded-xl bg-amber-400 animate-ping opacity-75 group-hover:opacity-0 transition-opacity duration-300 z-[-1]"></div>
                    </div>

                    {/* Brand text with enhanced styling */}
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400 group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-300">
                            {brandName}
                        </span>
                        <span className="text-xs text-amber-200/80 font-medium tracking-wide mt-[-2px]">
                            Premium Solutions
                        </span>
                    </div>
                </Link>
            </div>

            {/* Enhanced Right side (desktop) */}
            <div className="flex-1 justify-end md:flex items-center gap-3">
                <div className="h-5 w-px bg-white/30 mx-1"></div>
                {!isLoggedIn && (
                    <button onClick={() => navigate("/login")} className="relative group">
                        <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                                {loginText}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                        </div>
                        {/* Hover underline effect */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></div>
                    </button>
                )}

                {isLoggedIn && (
                    <button onClick={handleLogout} className="relative group">
                        <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                                {logoutText}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                        </div>
                        {/* Hover underline effect */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></div>
                    </button>
                )}

                <div className="h-5 w-px bg-white/30 mx-1"></div>
                <Link to="/signup" className="relative group">
                    <div className="flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg group-hover:from-amber-300 group-hover:to-orange-400 transition-all duration-300 group-hover:shadow-amber-500/25 hover:shadow-xl">
                        <span className="text-sm font-semibold text-gray-900">{signupText}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 text-gray-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                        </svg>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-amber-400 group-hover:animate-ping opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 z-[-1]"></div>
                </Link>
            </div>

            {/* Sidebar Drawer with Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-purple-50 to-indigo-100 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-5 border-b border-indigo-200">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
                        {menuTitle}
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn-circle btn-ghost btn-sm text-indigo-600 hover:bg-indigo-100"
                    >
                        ✕
                    </button>
                </div>

                <div className="overflow-y-auto h-full pb-20">
                    <ul className="menu p-4 w-full text-indigo-900">
                        <li className="mb-2">
                            <Link
                                to="/login"
                                className={`font-semibold rounded-lg hover:bg-indigo-500 hover:text-white transition-colors duration-200 ${
                                    location.pathname === "/login" ? "bg-indigo-500 text-white" : ""
                                }`}
                                onClick={handleNavigation}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {loginText}
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                to="/signup"
                                className={`font-semibold rounded-lg hover:bg-indigo-500 hover:text-white transition-colors duration-200 ${
                                    location.pathname === "/signup"
                                        ? "bg-indigo-500 text-white"
                                        : ""
                                }`}
                                onClick={handleNavigation}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>
                                {signupText}
                            </Link>
                        </li>

                        <div className="divider my-4"></div>

                        {mainLinks.map((link, index) => {
                            const linkPath = getMainLinkPath(link);
                            const hasSubLinks = subLinks[link] && subLinks[link].length > 0;

                            return (
                                <li key={index} className="mb-1">
                                    {hasSubLinks ? (
                                        <details open={activeIndex === index}>
                                            <summary
                                                className={`cursor-pointer rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-200 ${
                                                    location.pathname === linkPath
                                                        ? "bg-indigo-500 text-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveIndex(
                                                        activeIndex === index ? null : index
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={mainLinkIcons[link]}
                                                    className="h-5 w-5"
                                                />
                                                <span>{link}</span>
                                            </summary>
                                            <ul className="ml-2 mt-1 border-l-2 border-indigo-200 pl-3">
                                                {subLinks[link].map((sub, subIdx) => (
                                                    <li key={subIdx} className="mb-1">
                                                        <Link
                                                            to={sub.path}
                                                            className={`text-sm rounded-lg hover:bg-indigo-500 hover:text-white transition-colors duration-200 py-2 ${
                                                                location.pathname === sub.path
                                                                    ? "bg-indigo-500 text-white"
                                                                    : ""
                                                            }`}
                                                            onClick={handleNavigation}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    ) : (
                                        <Link
                                            to={linkPath}
                                            className={`rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-200 ${
                                                location.pathname === linkPath
                                                    ? "bg-indigo-500 text-white"
                                                    : ""
                                            }`}
                                            onClick={handleNavigation}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {link}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Footer in sidebar */}
                <div className="absolute bottom-0 w-full p-4 border-t border-indigo-200 bg-white/50">
                    <p className="text-center text-indigo-600 text-sm">{copyrightText}</p>
                </div>
            </div>
        </div>
    );
}
