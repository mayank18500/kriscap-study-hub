import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, MessageSquare, Eye, EyeOff, User, Calendar, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

const AdminComments = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: comments, isLoading } = useQuery({
        queryKey: ["adminComments"],
        queryFn: async () => {
            const response = await api.get("/api/admin/comments");
            return response.data;
        }
    });

    const toggleMutation = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            await api.patch(`/api/admin/comments/${id}/toggle`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminComments"] });
            toast({ title: "Updated", description: "Comment visibility updated." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to update comment.", variant: "destructive" });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            await api.delete(`/api/admin/comments/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminComments"] });
            toast({ title: "Deleted", description: "Comment has been deleted." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to delete comment.", variant: "destructive" });
        }
    });

    const filteredComments = comments?.filter((comment: any) =>
        comment.text.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        comment.user.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search comments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-heading">Comments ({filteredComments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Comment</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComments.map((comment: any, index: number) => (
                                    <motion.tr
                                        key={comment.id}
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
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{comment.user}</span>
                                                    <span className="text-xs text-muted-foreground">{comment.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 max-w-md truncate" title={comment.text}>
                                            {comment.text}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                {format(new Date(comment.date), "MMM d, yyyy")}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${comment.isVisible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {comment.isVisible ? "Visible" : "Hidden"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleMutation.mutate({ id: comment.id })}
                                                    title={comment.isVisible ? "Hide Comment" : "Show Comment"}
                                                >
                                                    {comment.isVisible ? <EyeOff className="w-4 h-4 text-destructive" /> : <Eye className="w-4 h-4 text-green-600" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this comment?")) {
                                                            deleteMutation.mutate({ id: comment.id });
                                                        }
                                                    }}
                                                    title="Delete Comment"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
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

export default AdminComments;
