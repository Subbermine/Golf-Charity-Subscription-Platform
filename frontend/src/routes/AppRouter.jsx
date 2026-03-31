import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Public/User Pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Charities = lazy(() => import('../pages/Charities'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Subscription = lazy(() => import('../pages/Subscription'));
const Draws = lazy(() => import('../pages/Draws'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Admin Pages
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const Overview = lazy(() => import('../pages/admin/Overview'));
const Users = lazy(() => import('../pages/admin/Users'));
const AdminDraws = lazy(() => import('../pages/admin/Draws'));
const CharityManager = lazy(() => import('../pages/admin/CharityManager'));
const Winners = lazy(() => import('../pages/admin/Winners'));
const Reports = lazy(() => import('../pages/admin/Reports'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen w-full bg-black">
    <Loader2 className="animate-spin text-brand-500 h-10 w-10" />
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        
        {/* Main Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="charities" element={<Charities />} />
          <Route path="draws" element={<Draws />} />
          
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="subscription" element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          } />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="draws" element={<AdminDraws />} />
          <Route path="charities" element={<CharityManager />} />
          <Route path="winners" element={<Winners />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<MainLayout />} >
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
