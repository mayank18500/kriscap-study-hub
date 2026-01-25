import { motion } from "framer-motion";
import { FileText, Package, Download, Eye, MoreVertical, Loader2, Receipt, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const tmaCount = orders?.filter(o => o.type === "TMA").length || 0;
  const projectCount = orders?.filter(o => o.type === "Project").length || 0;
  const totalSpent = orders?.reduce((acc, curr) => acc + (curr.price || curr.amount), 0) || 0;

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "In Transit":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Pending":
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    window.open(`${API_URL}/api/orders/invoice/${orderId}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[40vh] items-center justify-center text-slate-500 font-serif italic border-2 border-dashed border-slate-100 rounded-[2rem]">
        Unable to retrieve order history at this time.
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-10 pb-12">
      {/* Aesthetic Header */}
      <div>
        <h2 className="font-serif text-3xl font-bold text-slate-900">Transaction Ledger</h2>
        <p className="text-slate-500 italic">A comprehensive record of your academic acquisitions.</p>
      </div>

      {/* Summary Stats: "The Financial Statement" */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { label: "TMA Dossiers", val: tmaCount, icon: FileText, color: "text-amber-600" },
          { label: "Physical Projects", val: projectCount, icon: Package, color: "text-slate-600" },
          { label: "Total Investment", val: `₹${totalSpent}`, icon: Receipt, color: "text-emerald-600" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-slate-100 bg-[#fdfcf8] shadow-sm overflow-hidden group">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 font-serif">{stat.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Activity History</h3>
          <div className="h-[1px] flex-grow mx-4 bg-slate-100" />
        </div>

        {orders?.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-[2rem]">
            <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-serif italic">No transactions found in your records.</p>
          </div>
        ) : (
          orders?.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-[1.5rem] bg-white border border-slate-100 hover:border-amber-200 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100/50">
                <div className="flex items-center gap-5 w-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${
                    order.type === "TMA" ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"
                  }`}>
                    {order.type === "TMA" ? (
                      <FileText className="w-6 h-6 text-amber-600" />
                    ) : (
                      <Package className="w-6 h-6 text-slate-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {order.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>ID: {order.id.slice(-8).toUpperCase()}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{new Date(order.date || order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                  <div className="text-left sm:text-right space-y-1">
                    <div className="font-serif font-bold text-slate-900">₹{order.price || order.amount}</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-50">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                      <DropdownMenuItem className="text-xs font-medium py-2">
                        <Eye className="w-4 h-4 mr-2 text-slate-400" />
                        View Statement
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="text-xs font-medium py-2 text-amber-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-slate-300 uppercase">
          Kriscap Academic Records Section
        </p>
      </div>
    </div>
  );
};

export default Orders;