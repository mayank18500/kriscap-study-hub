import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Package, MoreVertical, Eye, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    { id: "ORD-2024-156", customer: "Rahul Sharma", email: "rahul@email.com", type: "TMA", product: "Mathematics Class 12", amount: 199, status: "Completed", date: "Jan 12, 2024" },
    { id: "ORD-2024-155", customer: "Priya Kumari", email: "priya@email.com", type: "Project", product: "Physics Investigatory", amount: 499, status: "Processing", date: "Jan 12, 2024", address: "Delhi" },
    { id: "ORD-2024-154", customer: "Amit Patel", email: "amit@email.com", type: "TMA", product: "English Class 12", amount: 149, status: "Completed", date: "Jan 11, 2024" },
    { id: "ORD-2024-153", customer: "Neha Reddy", email: "neha@email.com", type: "Project", product: "Chemistry Project", amount: 499, status: "In Transit", date: "Jan 10, 2024", tracking: "AWB123456789" },
    { id: "ORD-2024-152", customer: "Vikram Joshi", email: "vikram@email.com", type: "TMA", product: "Hindi Class 12", amount: 149, status: "Completed", date: "Jan 10, 2024" },
    { id: "ORD-2024-151", customer: "Sneha Iyer", email: "sneha@email.com", type: "Project", product: "Biology Project", amount: 499, status: "Pending", date: "Jan 9, 2024", address: "Mumbai" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "badge-success";
      case "Processing": return "badge-pending";
      case "In Transit": return "badge-warning";
      case "Pending": return "badge-pending";
      case "Delivered": return "badge-success";
      default: return "badge-pending";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders or customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="in transit">In Transit</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          order.type === "TMA" ? "bg-primary/10" : "bg-secondary/10"
                        }`}>
                          {order.type === "TMA" ? (
                            <FileText className="w-4 h-4 text-primary" />
                          ) : (
                            <Package className="w-4 h-4 text-secondary" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{order.id}</span>
                          <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                            order.type === "TMA" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                          }`}>
                            {order.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-foreground">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{order.product}</td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{order.amount}</td>
                    <td className="py-3 px-4">
                      <Select defaultValue={order.status.toLowerCase().replace(" ", "-")}>
                        <SelectTrigger className="w-32 h-8">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="in-transit">In Transit</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4 text-right">
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
                          {order.type === "Project" && (
                            <DropdownMenuItem>
                              <Truck className="w-4 h-4 mr-2" />
                              Add Tracking
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Complete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
