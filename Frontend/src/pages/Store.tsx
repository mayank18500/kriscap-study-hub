import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Package,
  ArrowRight,
  ShoppingCart,
  Eye,
  Star,
  Truck,
  Loader2,
  ShieldCheck,
  CheckCircle,
  Heart,
  Download,
  AlertCircle,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "@/types/product";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Store = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState(() => {
    return sessionStorage.getItem("ke_store_search") || "";
  });
  const [activeTab, setActiveTab] = useState<"all" | "tma" | "project-digital" | "project-physical">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  useEffect(() => {
    const query = sessionStorage.getItem("ke_store_search");
    if (query) {
      setSearchQuery(query);
      sessionStorage.removeItem("ke_store_search");
    }
  }, []);

  // Fetch all products
  const { data: products, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const response = await api.get<Product[]>("/api/products");
      return response.data;
    },
  });

  const { data: wishlistItems } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await api.get<Product[]>("/api/wishlist");
      return res.data;
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      await api.post("/api/wishlist", { productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast({ title: "Added to wishlist", description: "Product saved to your wishlist." });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to add to wishlist." });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      await api.delete(`/api/wishlist/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast({ title: "Removed from wishlist", description: "Product removed from your wishlist." });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to remove from wishlist." });
    },
  });

  const isInWishlist = (productId: string) => wishlistItems?.some((item) => (item.id || item._id) === productId);

  const handleBuyDirect = (product: Product) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to purchase files.",
      });
      return;
    }
    setSelectedProduct(product);
    setPhoneNumber(user.phoneNumber || "");
    setIsPhoneDialogOpen(true);
  };

  const confirmPurchase = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number."
      });
      return;
    }

    setIsProcessing(true);
    const product = selectedProduct!;

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast({
        variant: "destructive",
        title: "Gateway Error",
        description: "Payment system failed to initialize."
      });
      setIsProcessing(false);
      return;
    }

    try {
      const { data: orderData } = await api.post("/api/orders/create", {
        products: [{ product: product.id || product._id, quantity: 1 }],
        amount: product.offerPrice && product.offerPrice > 0 ? product.offerPrice : product.price,
        phoneNumber: phoneNumber
      });

      setIsPhoneDialogOpen(false);
      setIsProcessing(false);

      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kriscap Education",
        description: `Purchase: ${product.name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            await api.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast({ title: "Purchase Complete", description: "Your digital file is now available in Orders & Downloads." });
          } catch (verifyError) {
            toast({ variant: "destructive", title: "Verification Failed", description: "Please contact support." });
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#0F172A" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      requestAnimationFrame(() => paymentObject.open());
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Process Error",
        description: error.response?.data?.message || error.message || "Could not initiate purchase."
      });
      setIsProcessing(false);
    }
  };

  let activeProducts = products?.filter(p => p.active !== false) || [];

  const uniqueSubjects = Array.from(new Set(activeProducts.map(p => p.subject).filter(Boolean)));

  if (selectedSubject !== "all") {
    activeProducts = activeProducts.filter(p => p.subject === selectedSubject);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    activeProducts = activeProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.subject && p.subject.toLowerCase().includes(q)) ||
      p.class.toLowerCase().includes(q)
    );
  }

  // Section 1: TMA Files (Digital PDF)
  const tmaPdfs = activeProducts.filter(p => p.type === "TMA" && !p.isPhysical);

  // Section 2: Project File PDF Download
  const projectPdfs = activeProducts.filter(p => p.type === "PROJECT" && !p.isPhysical);

  // Section 3: Project File Home Delivery
  const projectPhysical = activeProducts.filter(p => p.type === "PROJECT" && p.isPhysical);
  const projectPhysicalCopyright = projectPhysical.filter(p => p.copyrightStatus === "COPYRIGHT");
  const projectPhysicalNonCopyright = projectPhysical.filter(p => p.copyrightStatus === "NON_COPYRIGHT");

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-12 w-12 animate-spin text-[#0b1f3c] dark:text-blue-500" />
      </div>
    );
  }

  const renderProductCard = (file: Product, isCartFlow: boolean) => {
    const productId = file.id || file._id;
    const hasOffer = file.offerPrice && file.offerPrice > 0;
    const currentPrice = hasOffer ? file.offerPrice : file.price;
    const originalPrice = file.price;
    const discount = hasOffer ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

    // Simulated ratings based on product ID to look authentic
    const ratingValue = 4.5 + (parseInt(productId?.slice(-2) || "3", 16) % 5) * 0.1;
    const reviewCount = 85 + (parseInt(productId?.slice(-3) || "5", 16) % 200);

    return (
      <div
        key={productId}
        className="w-full bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-[24px] border border-slate-200/60 dark:border-slate-800/60 p-3 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer relative group overflow-hidden"
        onClick={() => {
          setSelectedProduct(file);
          setIsViewDialogOpen(true);
        }}
      >
        {/* Subtle hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-900 hover:scale-110 transition-all duration-300 shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            if (isInWishlist(productId!)) {
              removeFromWishlistMutation.mutate(productId!);
            } else {
              addToWishlistMutation.mutate(productId!);
            }
          }}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist(productId!) ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Left: Product Thumbnail Box */}
        <div className="w-24 h-24 sm:w-48 sm:h-44 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 flex-shrink-0 flex items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-800/50 relative overflow-hidden shadow-inner group-hover:shadow-md transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
          {file.isPhysical ? (
            <Truck className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-500/80 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" />
          ) : (
            <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-500/80 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" />
          )}
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-950/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-sm">
            Class {file.class}
          </span>
          {file.copyrightStatus === 'NON_COPYRIGHT' && (
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden sm:inline-block shadow-sm">
              100% Genuine
            </span>
          )}
        </div>

        {/* Bottom: Product Details */}
        <div className="flex-grow flex flex-col justify-between min-w-0">
          <div className="space-y-1.5">
            {/* Title */}
            <h3 className="text-xs sm:text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 transition-all duration-300 line-clamp-2 leading-snug">
              {file.name}
            </h3>

            {/* Subtitles & Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{file.medium}</span>
              <span>•</span>
              <span className="truncate max-w-[80px] sm:max-w-none">Subject: {file.subject || "Academic"}</span>
              <span className="hidden sm:inline">•</span>
              <span className={`px-2 py-0.5 rounded-md text-[8px] sm:text-[10px] font-bold uppercase hidden sm:inline-block border ${file.isPhysical ? 'bg-amber-100/50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-500 border-amber-200/50 dark:border-amber-800/50' : 'bg-blue-100/50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50'
                }`}>
                {file.isPhysical ? 'Physical' : 'PDF'}
              </span>
            </div>

            {/* Ratings (Amazon style) */}
            <div className="flex items-center gap-1 flex-wrap mt-1">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 drop-shadow-sm ${i < Math.floor(ratingValue) ? "fill-amber-500 text-amber-500" : "text-slate-300 dark:text-slate-700"}`}
                  />
                ))}
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300">{ratingValue.toFixed(1)}</span>
              <span className="text-[9px] sm:text-[10px] text-blue-600 dark:text-blue-400 hover:underline">({reviewCount})</span>
            </div>

            {/* Best Seller / Choice Tag */}
            <div className="flex items-center gap-2">
              {ratingValue >= 4.7 && (
                <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md">
                  Best Seller
                </span>
              )}
              {file.copyrightStatus === 'NON_COPYRIGHT' && (
                <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md">
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Price & Delivery Section */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-2">
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">₹{currentPrice}</span>
                {hasOffer && (
                  <>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 line-through font-medium">₹{originalPrice}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded">({discount}% Off)</span>
                  </>
                )}
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                {file.isPhysical ? (
                  <>Get it by <span className="text-slate-700 dark:text-slate-300 font-bold">3-5 days</span></>
                ) : (
                  <><span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Instant Download</span></>
                )}
              </p>
              {file.stock <= 5 && file.stock > 0 && (
                <p className="text-[9px] sm:text-xs text-rose-500 font-bold">
                  Only {file.stock} left in stock.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full mt-1">
              {isCartFlow ? (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(file);
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white h-8 sm:h-9 px-2 font-bold shadow-md shadow-amber-500/25 transition-all active:scale-95 text-[10px] sm:text-xs border-0"
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Add to Cart
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyDirect(file);
                  }}
                  disabled={file.stock < 1}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white h-8 sm:h-9 px-2 font-bold shadow-md shadow-indigo-500/25 transition-all active:scale-95 text-[10px] sm:text-xs border-0 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  {file.stock > 0 ? "Buy Now" : "Out of Stock"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHorizontalScrollSection = (
    title: string,
    description: string,
    items: Product[],
    isCartFlow: boolean,
    icon: React.ReactNode
  ) => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              {icon}
              {title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium">{description}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 bg-white dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
            <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">No products currently available in this section.</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 sm:gap-4 pb-4 px-4 -mx-6 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 lg:gap-6 md:px-0 md:mx-auto">
            {items.map((file) => (
              <div key={file.id || file._id} className="flex-shrink-0 w-[65vw] max-w-[280px] md:w-full snap-center">
                {renderProductCard(file, isCartFlow)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCategoryGridView = (
    title: string,
    description: string,
    items: Product[],
    isCartFlow: boolean,
    icon?: React.ReactNode
  ) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              {icon || <Package className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mt-1 font-medium">{description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("all")}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30 rounded-full h-8 px-4"
          >
            ← Back
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
            <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">No products currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {items.map((file) => (
              <div key={file.id || file._id}>
                {renderProductCard(file, isCartFlow)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-4">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pb-4 space-y-6">

        {/* Top Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-none pb-1">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => { setActiveTab("all"); }}
            className={`rounded-full shrink-0 h-10 px-5 text-sm font-bold transition-all ${activeTab === "all" ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border-transparent" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm"}`}
          >
            All
          </Button>
          <Button
            variant={activeTab === "tma" ? "default" : "outline"}
            onClick={() => { setActiveTab("tma"); }}
            className={`rounded-full shrink-0 h-10 px-5 text-sm font-bold transition-all ${activeTab === "tma" ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border-transparent" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm"}`}
          >
            TMA(PDF)
          </Button>
          <Button
            variant={activeTab === "project-digital" ? "default" : "outline"}
            onClick={() => { setActiveTab("project-digital"); }}
            className={`rounded-full shrink-0 h-10 px-5 text-sm font-bold transition-all ${activeTab === "project-digital" ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border-transparent" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm"}`}
          >
            Practical(PDF)
          </Button>
          <Button
            variant={activeTab === "project-physical" ? "default" : "outline"}
            onClick={() => { setActiveTab("project-physical"); }}
            className={`rounded-full shrink-0 h-10 px-5 text-sm font-bold transition-all ${activeTab === "project-physical" ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border-transparent" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm"}`}
          >
            Physical Delivery
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-20 z-30 w-full flex flex-col gap-3 py-2">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 rounded-xl px-4 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800/60 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 transition-all font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeTab !== "all" && (
                <span className="w-4 h-4 bg-indigo-500 rounded-full text-[9px] font-black flex items-center justify-center text-white border border-white dark:border-slate-900 shadow-sm ml-1">
                  1
                </span>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 w-full pb-2 pt-1"
              >
                {/* Subject Filter Row */}
                {uniqueSubjects.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 pl-2 pr-1 shrink-0">Subject:</span>
                    <Button
                      variant={selectedSubject === "all" ? "default" : "ghost"}
                      onClick={() => { setSelectedSubject("all"); }}
                      className={`rounded-xl shrink-0 h-8 px-4 text-[10px] font-bold transition-all ${selectedSubject === "all" ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
                    >
                      All Subjects
                    </Button>
                    {uniqueSubjects.map(sub => (
                      <Button
                        key={sub as string}
                        variant={selectedSubject === sub ? "default" : "ghost"}
                        onClick={() => { setSelectedSubject(sub as string); }}
                        className={`rounded-xl shrink-0 h-8 px-4 text-[10px] font-bold transition-all ${selectedSubject === sub ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
                      >
                        {sub as string}
                      </Button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sections */}
        {activeTab === "all" ? (
          <div className="space-y-8">
            {renderHorizontalScrollSection(
              "TMA PDF Purchase",
              "Download professional-grade Tutor Marked Assignments (TMAs) solutions. Instantly unlocked after purchase.",
              tmaPdfs,
              false,
              <FileText className="w-5 h-5 text-indigo-500 drop-shadow-sm" />
            )}

            {renderHorizontalScrollSection(
              "Practical PDF Download",
              "Scholarly digital project reports available for instant download in PDF format. Print or write your own.",
              projectPdfs,
              false,
              <Download className="w-5 h-5 text-purple-500 drop-shadow-sm" />
            )}

            {projectPhysicalCopyright.length > 0 && renderHorizontalScrollSection(
              "Physical Delivery (Copyright)",
              "Handwritten, fully-compiled physical project notebooks customized by professionals.",
              projectPhysicalCopyright,
              true,
              <Truck className="w-5 h-5 text-amber-500 drop-shadow-sm" />
            )}

            {projectPhysicalNonCopyright.length > 0 && renderHorizontalScrollSection(
              "Physical Delivery (Non-Copyright)",
              "Verified handwritten, fully-compiled physical project notebooks delivered safely to your home.",
              projectPhysicalNonCopyright,
              true,
              <Truck className="w-5 h-5 text-amber-500 drop-shadow-sm" />
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {activeTab === "tma" && renderCategoryGridView(
              "TMA PDF Purchase",
              "Download professional-grade Tutor Marked Assignments (TMAs) solutions. Instantly unlocked after purchase.",
              tmaPdfs,
              false,
              <FileText className="w-6 h-6" />
            )}

            {activeTab === "project-digital" && renderCategoryGridView(
              "Practical PDF Download",
              "Scholarly digital project reports available for instant download in PDF format. Print or write your own.",
              projectPdfs,
              false,
              <Download className="w-6 h-6" />
            )}

            {activeTab === "project-physical" && (
              <div className="space-y-12">
                {projectPhysicalCopyright.length > 0 && renderCategoryGridView(
                  "Physical Delivery (Copyright)",
                  "Handwritten, fully-compiled physical project notebooks customized by professionals.",
                  projectPhysicalCopyright,
                  true,
                  <Truck className="w-6 h-6" />
                )}
                
                {projectPhysicalNonCopyright.length > 0 && renderCategoryGridView(
                  "Physical Delivery (Non-Copyright)",
                  "Verified handwritten, fully-compiled physical project notebooks delivered safely to your home.",
                  projectPhysicalNonCopyright,
                  true,
                  <Truck className="w-6 h-6" />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-6">
          <DialogHeader>
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-inner">
              {selectedProduct?.isPhysical ? (
                <Truck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <FileText className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <DialogTitle className="text-center text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Product Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            {selectedProduct && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">{selectedProduct.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1.5 flex items-center justify-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">{selectedProduct.medium} Medium</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 ml-1">Overview</Label>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                    {selectedProduct.description || "No description provided for this product."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Class</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{selectedProduct.class}th Grade</span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Format</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{selectedProduct.isPhysical ? "Home Delivery" : "PDF Download"}</span>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-800/50 dark:to-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-between shadow-inner">
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Total Price</span>
                  <div className="text-right">
                    {selectedProduct?.offerPrice && selectedProduct.offerPrice > 0 ? (
                      <div>
                        <span className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">₹{selectedProduct.offerPrice}</span>
                        <span className="text-sm text-slate-400 dark:text-slate-500 line-through ml-2 font-medium">₹{selectedProduct.price}</span>
                        <span className="block text-[10px] font-black text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-widest bg-emerald-500/10 inline-block px-1.5 py-0.5 rounded">
                          {Math.round(((selectedProduct.price - selectedProduct.offerPrice) / selectedProduct.price) * 100)}% DISCOUNT
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">₹{selectedProduct?.price}</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="mt-4">
            {selectedProduct?.isPhysical ? (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  addToCart(selectedProduct!);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl font-bold h-14 transition-all shadow-lg shadow-amber-500/25 text-base border-0"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleBuyDirect(selectedProduct!);
                }}
                disabled={selectedProduct ? selectedProduct.stock < 1 : true}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold h-14 transition-all shadow-lg shadow-indigo-500/25 text-base border-0 disabled:opacity-50"
              >
                <Download className="w-5 h-5 mr-2" />
                {selectedProduct && selectedProduct.stock > 0 ? "Buy Now" : "Out of Stock"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog (Razorpay Direct Checkout) */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-6">
          <DialogHeader className="items-center text-center">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <DialogTitle className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Secure Checkout</DialogTitle>
            <DialogDescription className="font-medium text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-2">
              Please verify your phone number for secure delivery tracking and direct WhatsApp receipt.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 ml-1">
                Active Phone Number
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-lg font-bold tracking-widest focus:ring-indigo-500/30 dark:focus:ring-indigo-500/30 text-center shadow-inner"
                placeholder="10-digit mobile number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={confirmPurchase}
              disabled={isProcessing}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95 text-base border-0"
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : "Proceed to Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Store;
