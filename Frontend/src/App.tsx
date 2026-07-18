import React, { Suspense, lazy, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from 'react-helmet-async';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import ErrorBoundary from "@/components/ErrorBoundary";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import { CartProvider } from "./contexts/CartContext";
import { CartSheet } from "./components/cart/CartSheet";

/* ---------------- Lazy Pages & Layouts ---------------- */
const Index = lazy(() => import("./pages/Index"));
const TMAFiles = lazy(() => import("./pages/TMAFiles"));
const ProjectFiles = lazy(() => import("./pages/ProjectFiles"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Courses = lazy(() => import("./pages/Courses"));
const Admission = lazy(() => import("./pages/Admission"));
const OrdersDownloads = lazy(() => import("./pages/OrdersDownloads"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));
const Careers = lazy(() => import("./pages/Careers"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Orders = lazy(() => import("./pages/Orders"));
const Downloads = lazy(() => import("./pages/Downloads"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const PublicLayout = lazy(() => import("./layouts/PublicLayout"));

const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminUploads = lazy(() => import("./pages/admin/AdminUploads"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminComments = lazy(() => import("./pages/admin/AdminComments"));

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
                      fallback = {
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
                        </div>
                      }
                    >
                      <Routes>
                        {/* ---------- Public Routes ---------- */}
                        <Route path="/" element={<Index />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/admission" element={<Admission />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/refund" element={<Refund />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/login/*" element={<Login />} />
                        <Route path="/register/*" element={<Register />} />

                        {/* ---------- Dashboard Routes Removed (Moved to Index.tsx) ---------- */}

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

                        {/* ---------- Legacy Redirects ---------- */}
                        <Route path="/dashboard" element={<Navigate to="/" replace />} />
                        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />

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
