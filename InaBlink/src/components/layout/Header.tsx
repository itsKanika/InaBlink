import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, BarChart2, Search, Settings, Moon, Sun, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Zap size={18} /> },
    { path: '/explore', label: 'Explore', icon: <Search size={18} /> },
    { path: '/pipelines', label: 'Pipelines', icon: <BarChart2 size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InaBlink
            </span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;