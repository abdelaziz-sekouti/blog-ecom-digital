import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: ChartBarIcon,
      color: 'text-blue-600'
    },
    {
      label: 'Inventory',
      path: '/admin/inventory',
      icon: ShoppingBagIcon,
      color: 'text-green-600'
    },
    {
      label: 'Blog CMS',
      path: '/admin/blog',
      icon: DocumentTextIcon,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-white shadow-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="text-xl font-bold text-primary-600">
              DigitalNexus
            </div>
            <span className="ml-2 text-xs text-gray-500">Admin</span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <UserCircleIcon className="h-10 w-10 text-gray-400" />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : item.color}`} />
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span className="ml-2 font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white shadow-sm border-b border-gray-200"
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {menuItems.find(item => location.pathname === item.path)?.label || 'Admin Dashboard'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  View Site
                </Link>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;