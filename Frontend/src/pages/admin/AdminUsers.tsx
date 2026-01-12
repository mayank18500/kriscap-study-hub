import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Phone, MapPin, Loader2, User, Eye, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";

import { useDebounce } from "@/hooks/use-debounce";

const AdminUsers = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const { data: users, isLoading } = useQuery({
        queryKey: ["adminUsers"],
        queryFn: async () => {
            const response = await api.get("/api/admin/users");
            return response.data;
        }
    });

    const filteredUsers = users?.filter((user: any) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-heading">Users ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user: any, index: number) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-border hover:bg-muted/50"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="font-medium text-foreground">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="w-3 h-3 text-muted-foreground" />
                                                    <span>{user.email}</span>
                                                </div>
                                                {user.phoneNumber && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="w-3 h-3 text-muted-foreground" />
                                                        <span>{user.phoneNumber}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium capitalize">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-muted-foreground">
                                            {format(new Date(user.createdAt), "MMM d, yyyy")}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* User Details Dialog */}
            <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>User Profile</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold">{selectedUser.name}</h3>
                                    <p className="text-muted-foreground">{selectedUser.email}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs capitalize">
                                        {selectedUser.role}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium border-b pb-2">Contact Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground block mb-1">Email</span>
                                        {selectedUser.email}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block mb-1">Phone</span>
                                        {selectedUser.phoneNumber || "-"}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block mb-1">Joined</span>
                                        {format(new Date(selectedUser.createdAt), "PPP")}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium border-b pb-2">Addresses</h4>
                                {selectedUser.addresses && selectedUser.addresses.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedUser.addresses.map((addr: any, i: number) => (
                                            <div key={i} className="bg-muted/30 p-3 rounded-lg text-sm">
                                                <div className="font-medium mb-1">{addr.addressLine1}</div>
                                                <div className="text-muted-foreground">
                                                    {addr.city}, {addr.state} - {addr.pincode}
                                                </div>
                                                {addr.isDefault && (
                                                    <span className="text-xs text-primary mt-1 inline-block">Default Address</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No addresses saved.</p>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default AdminUsers;
