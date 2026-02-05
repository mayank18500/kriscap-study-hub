import React, { Suspense, lazy, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from 'react-helmet-async';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import ErrorBoundary from "@/components/ErrorBoundary";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Orders from "./pages/Orders";
import Downloads from "./pages/Downloads";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

import AdminOverview from "./pages/admin/AdminOverview";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminUploads from "./pages/admin/AdminUploads";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminComments from "./pages/admin/AdminComments";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import { CartProvider } from "./contexts/CartContext";
import { CartSheet } from "./components/cart/CartSheet";

/* ---------------- Lazy Pages ---------------- */
const Index = lazy(() => import("./pages/Index"));
const TMAFiles = lazy(() => import("./pages/TMAFiles"));
const ProjectFiles = lazy(() => import("./pages/ProjectFiles"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

/* ---------------- Route Guards ---------------- */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

/* ---------------- App ---------------- */
const App = () => {
  const queryClientRef = useRef(new QueryClient());

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClientRef.current}>
          <TooltipProvider>
            <Helmet>
              <title>Kriscap Education | NIOS Study Hub</title>
            </Helmet>
            <Toaster />
            <Sonner />

            <AuthProvider>
              <SocketProvider>
                <CartProvider>
                  <BrowserRouter>
                    <CartSheet />

                    <Suspense
                      fallback={
                        <div className="min-h-screen flex items-center justify-center">
                          Loading...
                        </div>
                      }
                    >
                      <Routes>
                        {/* ---------- Public Routes ---------- */}
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route
                          path="/reset-password/:resetToken"
                          element={<ResetPassword />}
                        />

                        {/* ---------- Protected User Dashboard ---------- */}
                        <Route element={<ProtectedRoute />}>
                          <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Navigate to="tma" replace />} />
                            <Route path="tma" element={<TMAFiles />} />
                            <Route path="projects" element={<ProjectFiles />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="downloads" element={<Downloads />} />
                            <Route path="wishlist" element={<Wishlist />} />
                            <Route path="profile" element={<Profile />} />
                          </Route>
                        </Route>

                        {/* ---------- Admin Dashboard ---------- */}
                        <Route element={<AdminRoute />}>
                          <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminOverview />} />
                            <Route path="products" element={<AdminProducts />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="payments" element={<AdminPayments />} />
                            <Route path="uploads" element={<AdminUploads />} />
                            <Route path="comments" element={<AdminComments />} />
                            <Route path="settings" element={<AdminSettings />} />
                          </Route>
                        </Route>

                        {/* ---------- Protected Public Layout Pages ---------- */}
                        <Route element={<ProtectedRoute />}>
                          <Route element={<PublicLayout />}>
                            <Route path="/tma-files" element={<TMAFiles />} />
                            <Route path="/project-files" element={<ProjectFiles />} />
                          </Route>
                        </Route>

                        {/* ---------- 404 ---------- */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </CartProvider>
              </SocketProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
