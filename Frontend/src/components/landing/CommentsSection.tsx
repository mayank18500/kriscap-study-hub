import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Trash2, Loader2, User as UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
    _id: string;
    user: {
        _id: string;
        name: string;
        role: "user" | "admin";
    };
    text: string;
    createdAt: string;
}

const CommentsSection = () => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: comments, isLoading } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await api.get<Comment[]>("/api/comments");
            return res.data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (text: string) => {
            await api.post("/api/comments", { text });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            setNewComment("");
            toast({ title: "Comment posted!" });
        },
        onError: () => {
            toast({ variant: "destructive", title: "Failed to post comment" });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/api/comments/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            toast({ title: "Comment deleted" });
        },
        onError: () => {
            toast({ variant: "destructive", title: "Failed to delete comment" });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        createMutation.mutate(newComment);
    };

    return (
        <section className="py-16 bg-[#fdfcf8] border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <MessageSquare className="w-3 h-3" /> Community
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">Student Feedback</h2>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        See what other students are saying about their experience with Kriscap Study Hub.
                    </p>
                </div>

                {/* Comment Form */}
                <div className="mb-12">
                    {user ? (
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative">
                            <Textarea
                                placeholder="Share your thoughts..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[100px] border-none focus-visible:ring-0 resize-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                            />
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                        <UserIcon className="w-3 h-3" />
                                    </span>
                                    Posting as {user.name}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={createMutation.isPending || !newComment.trim()}
                                    className="bg-slate-900 text-white rounded-xl px-6 font-bold hover:bg-slate-800"
                                >
                                    {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Comment"}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-500 font-medium mb-4">Please login to share your thoughts.</p>
                            <Button variant="outline" className="rounded-xl font-bold" onClick={() => window.location.href = '/auth'}>
                                Login to Comment
                            </Button>
                        </div>
                    )}
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                    {isLoading ? (
                        <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>
                    ) : comments?.length === 0 ? (
                        <p className="text-center text-slate-400 italic">No comments yet. Be the first!</p>
                    ) : (
                        <AnimatePresence>
                            {comments?.filter(comment => comment.user && comment.user.name).map((comment) => (
                                <motion.div
                                    key={comment._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-lg shrink-0">
                                                {comment.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-slate-900">{comment.user.name}</h4>
                                                    {comment.user.role === 'admin' && (
                                                        <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">Admin</span>
                                                    )}
                                                    <span className="text-xs text-slate-400 font-medium">• {formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                                                </div>
                                                <p className="text-slate-600 leading-relaxed">{comment.text}</p>
                                            </div>
                                        </div>
                                        {(user?.role === 'admin' || user?._id === comment.user._id) && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteMutation.mutate(comment._id)}
                                                disabled={deleteMutation.isPending}
                                                className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CommentsSection;
