import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, Calendar, ArrowUpRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";

const AdminPayments = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: payments, isLoading } = useQuery({
        queryKey: ["adminPayments"],
        queryFn: async () => {
            const response = await api.get("/api/admin/payments");
            return response.data;
        }
    });

    const filteredPayments = payments?.filter((payment: any) =>
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search payments, transaction ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Payments Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-heading">Transactions ({filteredPayments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Method</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment: any, index: number) => (
                                    <motion.tr
                                        key={payment.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-border hover:bg-muted/50"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                                                    <CreditCard className="w-4 h-4 text-success" />
                                                </div>
                                                <span className="font-mono text-xs font-medium">{payment.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div>
                                                <div className="font-medium text-foreground">{payment.user}</div>
                                                <div className="text-xs text-muted-foreground">{payment.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-foreground font-medium">
                                            ₹{payment.amount}
                                        </td>
                                        <td className="py-3 px-4 text-muted-foreground text-sm">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {format(new Date(payment.date), "MMM d, yyyy")}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-muted-foreground text-sm">
                                            {payment.method}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                                                {payment.status}
                                            </span>
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

export default AdminPayments;
