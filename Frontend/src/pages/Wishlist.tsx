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

    const handleExploreClick = () => {
        sessionStorage.setItem("ke_active_view", "store");
    };

    return (
        <div className="min-h-screen bg-[#fdfcf8] pt-12 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center gap-3 mb-8">
                    <Button variant="ghost" className="rounded-full w-10 h-10 p-0 hover:bg-slate-100" asChild>
                        <Link to="/" onClick={() => sessionStorage.setItem("ke_active_view", "home")}>
                            <ArrowLeft className="w-5 h-5 text-slate-650" />
                        </Link>
                    </Button>
                    <h1 className="font-serif text-2xl md:text-4xl font-bold text-slate-900">
                        My Wishlist
                    </h1>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                    </div>
                ) : wishlist?.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-[20px] border border-dashed border-slate-200 p-6 shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-6 max-w-xs mx-auto text-xs leading-relaxed">
                            Looks like you haven't saved any items yet. Explore our collection and find something you love!
                        </p>
                        <Button className="rounded-xl px-6 h-11 font-bold bg-slate-900 text-white hover:bg-slate-800 text-xs shadow-sm" asChild>
                            <Link to="/" onClick={handleExploreClick}>Explore Products</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {wishlist?.map((product) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden flex-shrink-0">
                                    {product.previewUrl ? (
                                        <img
                                            src={product.previewUrl.startsWith("http") ? product.previewUrl : `https://kriscap-study-hub.onrender.com${product.previewUrl}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <ShoppingBag className="w-12 h-12 opacity-15" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 z-10">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full w-8 h-8 bg-white/95 backdrop-blur-sm text-red-500 hover:text-red-600 hover:bg-white shadow-sm border border-slate-100"
                                            onClick={() => removeFromWishlistMutation.mutate(product._id)}
                                            disabled={removeFromWishlistMutation.isPending}
                                        >
                                            {removeFromWishlistMutation.isPending ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <Heart className="w-3.5 h-3.5 fill-current" />
                                            )}
                                        </Button>
                                    </div>
                                    {/* Sale badge if offerPrice exists */}
                                    {product.offerPrice && product.offerPrice > 0 && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
                                            Sale
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                                            Class {product.class} • {product.subject || "Academic"}
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-2 leading-tight">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-base font-black text-slate-900">
                                                ₹{product.offerPrice || product.price}
                                            </span>
                                            {product.offerPrice && product.offerPrice > 0 && (
                                                <span className="text-xs text-slate-400 line-through decoration-slate-300">
                                                    ₹{product.price}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            className="rounded-xl px-4 h-10 font-bold bg-[#0b1f3c] hover:bg-[#1e3a5f] text-white text-xs"
                                            onClick={handleExploreClick}
                                            asChild
                                        >
                                            <Link to="/">Buy Now</Link>
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
