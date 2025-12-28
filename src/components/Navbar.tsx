import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavbarProps {
  scrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled = false }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary-600"
            >
              DigitalNexus
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/store"
              className={`font-medium transition-colors hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Store
            </Link>
            <Link
              to="/blog"
              className={`font-medium transition-colors hover:text-primary-600 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/admin/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  scrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-gray-100'
                }`}
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;