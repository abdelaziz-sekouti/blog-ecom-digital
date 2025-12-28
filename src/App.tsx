import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import SEOAnalytics from './components/SEOAnalytics';
import SEO from './components/SEO';
import Home from './pages/Home';
import Store from './pages/Store';
import Blog from './pages/Blog';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import InventoryManagement from './pages/admin/InventoryManagement';
import BlogCMS from './pages/admin/BlogCMS';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 20,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4,
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <SEOAnalytics>
        <AuthProvider>
          <SEO noindex={process.env.NODE_ENV !== 'production'} />
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/store"
                element={
                  <PageWrapper>
                    <Store />
                  </PageWrapper>
                }
              />
              <Route
                path="/blog"
                element={
                  <PageWrapper>
                    <Blog />
                  </PageWrapper>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="inventory" element={<InventoryManagement />} />
                        <Route path="blog" element={<BlogCMS />} />
                      </Routes>
                    </AdminLayout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </SEOAnalytics>
    </Router>
  );
}

export default App;
