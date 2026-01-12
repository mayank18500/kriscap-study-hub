import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSocket } from "@/contexts/SocketContext";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/tma": "Buy TMA Files",
    "/dashboard/projects": "Buy Project Files",
    "/dashboard/orders": "My Orders",
    "/dashboard/downloads": "My Downloads",
    "/dashboard/profile": "Profile",
  };
  return routes[pathname] || "Dashboard";
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const { socket } = useSocket();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on("payment_success", (data: any) => {
      toast({
        title: "Payment Successful",
        description: `Order #${data.orderId} verified.`,
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Future proofing
    });

    socket.on("order_status_update", (data: any) => {
      toast({
        title: "Order Updated",
        description: `Order #${data.orderId} is now ${data.status}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    socket.on("file_unlocked", (data: any) => {
      toast({
        title: "File Unlocked",
        description: `${data.fileName} is ready for download.`,
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["downloads"] });
    });

    return () => {
      socket.off("payment_success");
      socket.off("order_status_update");
      socket.off("file_unlocked");
    };
  }, [socket, queryClient, toast]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
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

export default DashboardLayout;
