import { motion } from "framer-motion";
import { FileText, Package, Download, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Orders = () => {
  const orders = [
    {
      id: "ORD-2024-001",
      type: "TMA",
      name: "Mathematics Class 12 TMA",
      status: "Completed",
      date: "Jan 10, 2024",
      price: 199,
    },
    {
      id: "ORD-2024-002",
      type: "Project",
      name: "Physics Investigatory Project Class 12",
      status: "In Transit",
      date: "Jan 8, 2024",
      price: 499,
      tracking: "AWB123456789",
    },
    {
      id: "ORD-2024-003",
      type: "TMA",
      name: "English Class 12 TMA",
      status: "Completed",
      date: "Jan 5, 2024",
      price: 149,
    },
    {
      id: "ORD-2024-004",
      type: "TMA",
      name: "Hindi Class 12 TMA",
      status: "Completed",
      date: "Jan 3, 2024",
      price: 149,
    },
    {
      id: "ORD-2024-005",
      type: "Project",
      name: "Chemistry Investigatory Project Class 12",
      status: "Delivered",
      date: "Dec 28, 2023",
      price: 499,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "badge-success";
      case "In Transit":
        return "badge-warning";
      case "Delivered":
        return "badge-success";
      case "Pending":
        return "badge-pending";
      default:
        return "badge-pending";
    }
  };

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
              <div className="text-2xl font-bold text-foreground">12</div>
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
              <div className="text-2xl font-bold text-foreground">3</div>
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
              <div className="text-2xl font-bold text-foreground">₹2,443</div>
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
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    order.type === "TMA" ? "bg-primary/10" : "bg-secondary/10"
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
                      {order.id} • {order.date}
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
                    <div className="font-semibold text-foreground">₹{order.price}</div>
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
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
