import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Loader2, Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface Product {
    _id: string;
    name: string;
    price: number;
    offerPrice?: number;
    description: string;
    fileUrl: string;
    previewUrl?: string;
    type: "TMA" | "PROJECT";
    class: string;
    subject?: string;
    medium?: string;
    stock: number;
    isPhysical: boolean;
    rating: number;
    reviews: number;
}

const Wishlist = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: wishlist, isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            const res = await api.get<Product[]>("/api/wishlist");
            return res.data;
        },
    });

    const removeFromWishlistMutation = useMutation({
        mutationFn: async (productId: string) => {
            await api.delete(`/api/wishlist/${productId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            toast({ title: "Removed from wishlist" });
        },
        onError: () => {
            toast({ variant: "destructive", title: "Failed to remove" });
        },
    });

    return (
        <div className="min-h-screen bg-[#fdfcf8] pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" className="rounded-full w-10 h-10 p-0" asChild>
                        <Link to="/">
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </Link>
                    </Button>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                        My Wishlist
                    </h1>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                    </div>
                ) : wishlist?.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                            Looks like you haven't saved any items yet. Explore our collection and find something you love!
                        </p>
                        <Button className="rounded-xl px-8 font-bold bg-slate-900 text-white hover:bg-slate-800" asChild>
                            <Link to="/">Explore Products</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {wishlist?.map((product) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                    {product.previewUrl ? (
                                        <img
                                            src={`http://localhost:5000${product.previewUrl}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                            <ShoppingBag className="w-12 h-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 z-10">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full bg-white/90 backdrop-blur-sm text-red-500 hover:text-red-600 hover:bg-white shadow-sm"
                                            onClick={() => removeFromWishlistMutation.mutate(product._id)}
                                            disabled={removeFromWishlistMutation.isPending}
                                        >
                                            {removeFromWishlistMutation.isPending ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Heart className="w-4 h-4 fill-current" />
                                            )}
                                        </Button>
                                    </div>
                                    {/* Sale badge if offerPrice exists */}
                                    {product.offerPrice && product.offerPrice > 0 && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                            Sale
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                                                {product.class} • {product.subject}
                                            </div>
                                            <Link to={`/products/${product._id}`} className="block">
                                                <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-slate-900">
                                                ₹{product.offerPrice || product.price}
                                            </span>
                                            {product.offerPrice && product.offerPrice > 0 && (
                                                <span className="text-sm text-slate-400 line-through decoration-slate-300">
                                                    ₹{product.price}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            size="sm"
                                            className="rounded-xl px-4 font-bold bg-amber-100 text-amber-900 hover:bg-amber-200"
                                            asChild
                                        >
                                            <Link to={`/products/${product._id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
