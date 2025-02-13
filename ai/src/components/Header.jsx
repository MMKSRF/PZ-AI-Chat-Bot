import { useContext } from "react";
import { ChatContext } from "../contexts/SecondPage";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const { LogedIn, setLogedIn, isDarkTheme, setIsDarkTheme } = useContext(ChatContext);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section - Branding */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-black dark:bg-gray-700 rounded-lg">
                                <svg 
                                    className="w-6 h-6 text-white"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M13 10V3L4 14h7v7l9-11h-7z" 
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI ChatBot</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Advanced AI</p>
                            </div>
                        </div>
                    </div>

                    {/* Center section - Navigation (hidden on mobile) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/"  
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors ${
                                    isActive 
                                        ? "text-black dark:text-white" 
                                        : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/features" 
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors ${
                                    isActive 
                                        ? "text-black dark:text-white" 
                                        : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                }`
                            }
                        >
                            Features
                        </NavLink>
                        <NavLink 
                            to="/documentation" 
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors ${
                                    isActive 
                                        ? "text-black dark:text-white" 
                                        : "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                }`
                            }
                        >
                            Documentation
                        </NavLink>
                    </nav>

                    {/* Right section - User/Auth */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <button 
                            onClick={() => setIsDarkTheme(!isDarkTheme)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDarkTheme ? (
                                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        
                        {!LogedIn ? (
                            <>
                                <Link to="/signup">
                                    <button 
                                        onClick={() => setLogedIn(true)} 
                                        className="px-3 py-2 md:px-4 text-sm text-black dark:text-gray-100 border-2 border-black dark:border-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                                <Link to="/login">
                                    <button  
                                        onClick={() => setLogedIn(true)}  
                                        className="px-3 py-2 md:px-4 text-sm text-black dark:text-gray-100 border-2 border-black dark:border-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Log In
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/logout">
                                <button  
                                    onClick={() => setLogedIn(false)} 
                                    className="px-3 py-2 md:px-4 text-sm text-black dark:text-gray-100 border-2 border-black dark:border-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Log out
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;