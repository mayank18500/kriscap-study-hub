import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Package, MoreVertical, Eye, Truck, CheckCircle, Loader2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const response = await api.get("/api/admin/orders");
      return response.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      await api.patch(`/api/admin/orders/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      toast({ title: "Updated", description: "Order status updated" });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to update status" });
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Processing": return "bg-blue-100 text-blue-700";
      case "In Transit": return "bg-yellow-100 text-yellow-700";
      case "Pending": return "bg-gray-100 text-gray-700";
      case "Delivered": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders?.filter((order: any) => {
    const matchesSearch =
      order?.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.customer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order?.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

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
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
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
            <table className="w-full min-w-[800px]">
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
                {filteredOrders.map((order: any, index: number) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${order.type === "TMA" ? "bg-primary/10" : "bg-secondary/10"
                          }`}>
                          {order.type === "TMA" ? (
                            <FileText className="w-4 h-4 text-primary" />
                          ) : (
                            <Package className="w-4 h-4 text-secondary" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{order.id.slice(-6).toUpperCase()}</span>
                          <div className="flex gap-1 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs ${order.type === "TMA" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                              {order.type}
                            </span>
                            {order.type !== "TMA" && (
                              <span className="px-2 py-0.5 rounded text-xs bg-orange-100 text-orange-700 flex items-center gap-1">
                                <Truck className="w-3 h-3" /> Delivery
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-foreground">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                        {order.phone && <div className="text-xs text-muted-foreground">{order.phone}</div>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{order.product}</td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{order.amount}</td>
                    <td className="py-3 px-4">
                      <Select
                        defaultValue={order.status}
                        onValueChange={(val) => updateStatusMutation.mutate({ id: order.id, status: val })}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="In Transit">In Transit</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {order.date ? format(new Date(order.date), "MMM d, yyyy") : "-"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {order.type === "Project" && (
                            <DropdownMenuItem>
                              <Truck className="w-4 h-4 mr-2" />
                              Add Tracking
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: order.id, status: "Completed" })}>
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

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Customer Information</h4>
                  <div className="bg-muted/30 p-3 rounded-lg space-y-1 text-sm">
                    <div className="font-medium text-foreground">{selectedOrder.customer}</div>
                    <div>{selectedOrder.email}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{selectedOrder.phone || "No phone number"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Order Information</h4>
                  <div className="bg-muted/30 p-3 rounded-lg space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="font-mono">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedOrder.date ? format(new Date(selectedOrder.date), "PPP") : "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">₹{selectedOrder.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment ID:</span>
                      <span className="font-mono text-xs">{selectedOrder.razorpayPaymentId || "-"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div>
                    <h4 className="font-medium text-muted-foreground mb-2">Product Details ({selectedOrder.products?.length || 1})</h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                      {selectedOrder.products?.map((item: any, idx: number) => (
                        <div key={idx} className="bg-muted/30 p-3 rounded-lg flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === "TMA" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                            {item.type === "TMA" ? <FileText className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.type} • ₹{item.price}</div>
                          </div>
                        </div>
                      )) || (
                          /* Fallback for old single-product structure just in case */
                          <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedOrder.type === "TMA" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                              {selectedOrder.type === "TMA" ? <FileText className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{selectedOrder.product}</div>
                              <div className="text-xs text-muted-foreground">{selectedOrder.type}</div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-muted-foreground mb-2">Shipping Address</h4>
                    {selectedOrder.shippingAddress ? (
                      <div className="bg-muted/30 p-3 rounded-lg text-sm space-y-1">
                        <div>{selectedOrder.shippingAddress.addressLine1}</div>
                        <div>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</div>
                        <div>{selectedOrder.shippingAddress.pincode}</div>
                      </div>
                    ) : (
                      <div className="bg-muted/30 p-3 rounded-lg text-sm text-muted-foreground italic">
                        No shipping address provided (Digital Order)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default AdminOrders;
