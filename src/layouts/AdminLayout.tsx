import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    "/admin": "Overview",
    "/admin/products": "Products",
    "/admin/orders": "Orders",
    "/admin/users": "Users",
    "/admin/upload": "Upload Files",
    "/admin/payments": "Payments",
    "/admin/settings": "Settings",
  };
  return routes[pathname] || "Admin";
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="lg:pl-64">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
