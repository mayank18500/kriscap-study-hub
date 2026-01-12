import { motion } from "framer-motion";
import { FileText, Package, Download, Eye, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import api, { API_URL } from "@/lib/api";

const Orders = () => {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get<any[]>("/api/orders/my-orders");
      return response.data;
    },
  });

  // Calculate summary stats dynamically if needed, or fetch from backend
  const tmaCount = orders?.filter(o => o.type === "TMA").length || 0;
  const projectCount = orders?.filter(o => o.type === "Project").length || 0;
  const totalSpent = orders?.reduce((acc, curr) => acc + curr.price, 0) || 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "badge-success";
      case "In Transit":
        return "badge-warning";
      case "Pending":
      default:
        return "badge-pending";
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    window.open(`${API_URL}/api/orders/invoice/${orderId}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{tmaCount}</div>
              <div className="text-sm text-muted-foreground">TMA Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{projectCount}</div>
              <div className="text-sm text-muted-foreground">Project Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Download className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">₹{totalSpent}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No orders found.</div>
            ) : (
              orders?.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${order.type === "TMA" ? "bg-primary/10" : "bg-secondary/10"
                      }`}>
                      {order.type === "TMA" ? (
                        <FileText className="w-5 h-5 text-primary" />
                      ) : (
                        <Package className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{order.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.id} • {new Date(order.date || order.createdAt).toLocaleDateString()}
                      </div>
                      {order.tracking && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Tracking: {order.tracking}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="font-semibold text-foreground">₹{order.price || order.amount}</div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadInvoice(order.id)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
