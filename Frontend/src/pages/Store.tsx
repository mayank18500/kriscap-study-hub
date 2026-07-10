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

  // Sections Filtering
  let activeProducts = products?.filter(p => p.active !== false) || [];
  
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    activeProducts = activeProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.subject.toLowerCase().includes(q) ||
      p.class.toLowerCase().includes(q)
    );
  }

  // Section 1: TMA Files (Digital PDF)
  const tmaPdfs = activeProducts.filter(p => p.type === "TMA" && !p.isPhysical);
  
  // Section 2: Project File PDF Download
  const projectPdfs = activeProducts.filter(p => p.type === "PROJECT" && !p.isPhysical);
  
  // Section 3: Project File Home Delivery
  const projectPhysical = activeProducts.filter(p => p.type === "PROJECT" && p.isPhysical);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#0b1f3c]" />
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
        className="w-full glass rounded-[20px] p-3.5 sm:p-5 flex flex-row gap-3.5 sm:gap-6 card-hover relative group overflow-hidden"
        onClick={() => {
          setSelectedProduct(file);
          setIsViewDialogOpen(true);
        }}
      >
        {/* Subtle hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full glass border-white/50 text-slate-400 hover:text-rose-500 hover:scale-110 transition-all duration-300 shadow-sm"
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
        <div className="w-24 h-24 sm:w-48 sm:h-44 bg-gradient-to-br from-slate-50 to-slate-100 flex-shrink-0 flex items-center justify-center rounded-2xl border border-white/60 relative overflow-hidden shadow-inner group-hover:shadow-md transition-all duration-500">
          {file.isPhysical ? (
            <Truck className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-500/80 group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-500/80 group-hover:scale-110 transition-transform duration-500" />
          )}
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
            Class {file.class}
          </span>
          {file.copyrightStatus === 'NON_COPYRIGHT' && (
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden sm:inline-block">
              100% Genuine
            </span>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex-grow flex flex-col justify-between min-w-0 pr-4 sm:pr-0">
          <div className="space-y-1 sm:space-y-2">
            {/* Title */}
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2 leading-snug">
              {file.name}
            </h3>

            {/* Subtitles & Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-[9px] sm:text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{file.medium}</span>
              <span>•</span>
              <span className="truncate max-w-[80px] sm:max-w-none">Subject: {file.subject || "Academic"}</span>
              <span className="hidden sm:inline">•</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-bold uppercase hidden sm:inline-block ${
                file.isPhysical ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {file.isPhysical ? 'Physical' : 'PDF'}
              </span>
            </div>

            {/* Ratings (Amazon style) */}
            <div className="flex items-center gap-1 flex-wrap">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(ratingValue) ? "fill-amber-500 text-amber-500" : "text-slate-300"}`} 
                  />
                ))}
              </div>
              <span className="text-[9px] sm:text-xs font-semibold text-slate-700">{ratingValue.toFixed(1)}</span>
              <span className="text-[9px] sm:text-blue-600 hover:underline">({reviewCount})</span>
            </div>

            {/* Best Seller / Choice Tag */}
            <div className="flex items-center gap-1.5">
              {ratingValue >= 4.7 && (
                <span className="px-1.5 py-0.5 bg-[#F59E0B] text-[#0B1F3C] text-[8px] sm:text-[10px] font-extrabold uppercase rounded shadow-sm">
                  Best Seller
                </span>
              )}
              {file.copyrightStatus === 'NON_COPYRIGHT' && (
                <span className="px-1.5 py-0.5 bg-[#0B1F3C] text-white text-[8px] sm:text-[10px] font-extrabold uppercase rounded shadow-sm">
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Price & Delivery Section */}
          <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-sm sm:text-2xl font-extrabold text-[#0F172A]">₹{currentPrice}</span>
                {hasOffer && (
                  <>
                    <span className="text-[9px] sm:text-sm text-slate-400 line-through">M.R.P.: ₹{originalPrice}</span>
                    <span className="text-[9px] sm:text-sm font-bold text-red-650">({discount}% Off)</span>
                  </>
                )}
              </div>
              <p className="text-[9px] sm:text-xs text-slate-500 font-medium">
                {file.isPhysical ? (
                  <>Get it by <span className="text-slate-700 font-bold">3-5 days</span></>
                ) : (
                  <><span className="text-[#16A34A] font-bold">Instant Download</span></>
                )}
              </p>
              {file.stock <= 5 && file.stock > 0 && (
                <p className="text-[9px] sm:text-xs text-red-605 font-bold">
                  Only {file.stock} left.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 self-start sm:self-auto">
              {isCartFlow ? (
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(file);
                  }} 
                  className="rounded-lg bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0B1F3C] hover:text-[#0B1F3C] h-8 sm:h-10 px-3 sm:px-5 font-bold shadow-md transition-all active:scale-95 text-[10px] sm:text-xs border border-[#F59E0B]"
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1 sm:mr-2" />
                  Add to Cart
                </Button>
              ) : (
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyDirect(file);
                  }} 
                  disabled={file.stock < 1}
                  className="rounded-lg bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0B1F3C] hover:text-[#0B1F3C] h-8 sm:h-10 px-3 sm:px-5 font-bold shadow-md transition-all active:scale-95 text-[10px] sm:text-xs disabled:opacity-50 border border-[#F59E0B]"
                >
                  <Download className="w-3.5 h-3.5 mr-1 sm:mr-2" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
              {icon}
              {title}
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl">{description}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 bg-white border border-dashed border-slate-200 rounded-[2rem]">
            <AlertCircle className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-sm text-slate-400 italic">No products currently available in this section.</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 px-4 -mx-6 md:flex-col md:gap-6 md:px-0 md:mx-auto">
            {items.map((file) => (
              <div key={file.id || file._id} className="flex-shrink-0 w-[88vw] max-w-[340px] md:w-full snap-center">
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
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              {icon || <Package className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-800">{title}</h2>
              <p className="text-xs text-slate-500 max-w-xl mt-0.5">{description}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("all")} 
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-full h-8 px-3"
          >
            ← Back
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-slate-200 rounded-[2rem]">
            <AlertCircle className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-sm text-slate-400 italic">No products currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    <div className="w-full px-6 md:px-12 py-6 space-y-8">
      
      {/* Premium Hero Banner */}
      <div className="relative rounded-[2rem] gradient-hero text-white py-8 px-6 md:px-10 overflow-hidden shadow-2xl shadow-indigo-900/20">
        {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div> */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-purple-500/10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-[10px] font-bold uppercase tracking-widest">
                Academic Catalog
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Resource Center
              </h1>
            </div>
            <p className="text-indigo-100/80 text-sm max-w-xl font-light">
              Access professional digital resources, study guides, and comprehensive materials instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-indigo-50">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-300" />
              Verified Content
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <Truck className="w-4 h-4 text-indigo-300" />
              Swift Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-20 z-30 w-full flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className="w-9 h-9 rounded-full p-0 flex items-center justify-center relative shrink-0 bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/60 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            title="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeTab !== "all" && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-500 rounded-full text-[8px] font-black flex items-center justify-center text-slate-950 border border-white">
                !
              </span>
            )}
          </Button>
        </div>

        {/* Expandable Filter Categories */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 overflow-x-auto w-full pb-2 pt-1 scrollbar-none bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-100/80 shadow-md"
            >
              <Button 
                variant={activeTab === "all" ? "default" : "outline"} 
                onClick={() => {
                  setActiveTab("all");
                }}
                className="rounded-full shrink-0 h-9 px-4 text-xs font-bold"
              >
                All Items
              </Button>
              <Button 
                variant={activeTab === "tma" ? "default" : "outline"} 
                onClick={() => {
                  setActiveTab("tma");
                }}
                className="rounded-full shrink-0 h-9 px-4 text-xs font-bold"
              >
                TMA (PDF)
              </Button>
              <Button 
                variant={activeTab === "project-digital" ? "default" : "outline"} 
                onClick={() => {
                  setActiveTab("project-digital");
                }}
                className="rounded-full shrink-0 h-9 px-4 text-xs font-bold"
              >
                Projects (PDF)
              </Button>
              <Button 
                variant={activeTab === "project-physical" ? "default" : "outline"} 
                onClick={() => {
                  setActiveTab("project-physical");
                }}
                className="rounded-full shrink-0 h-9 px-4 text-xs font-bold"
              >
                Physical Delivery
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sections */}
      {activeTab === "all" ? (
        <div className="space-y-12">
          {renderHorizontalScrollSection(
            "TMA PDF Purchase",
            "Download professional-grade Tutor Marked Assignments (TMAs) solutions. Instantly unlocked after purchase.",
            tmaPdfs,
            false,
            <FileText className="w-6 h-6 text-blue-600" />
          )}

          {renderHorizontalScrollSection(
            "Project File PDF Download",
            "Scholarly digital project reports available for instant download in PDF format. Print or write your own.",
            projectPdfs,
            false,
            <Download className="w-6 h-6 text-[#0b1f3c]" />
          )}

          {renderHorizontalScrollSection(
            "Project File for Home Delivery",
            "Handwritten, fully-compiled physical project notebooks customized by professionals and delivered safely to your home.",
            projectPhysical,
            true,
            <Truck className="w-6 h-6 text-amber-600" />
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {activeTab === "tma" && renderCategoryGridView(
            "TMA PDF Purchase",
            "Download professional-grade Tutor Marked Assignments (TMAs) solutions. Instantly unlocked after purchase.",
            tmaPdfs,
            false,
            <FileText className="w-5 h-5 text-blue-600" />
          )}

          {activeTab === "project-digital" && renderCategoryGridView(
            "Project File PDF Download",
            "Scholarly digital project reports available for instant download in PDF format. Print or write your own.",
            projectPdfs,
            false,
            <Download className="w-5 h-5 text-[#0b1f3c]" />
          )}

          {activeTab === "project-physical" && renderCategoryGridView(
            "Project File for Home Delivery",
            "Handwritten, fully-compiled physical project notebooks customized by professionals and delivered safely to your home.",
            projectPhysical,
            true,
            <Truck className="w-5 h-5 text-amber-600" />
          )}
        </div>
      )}

      {/* Product Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] bg-[#fdfcf8] border-none shadow-2xl">
          <DialogHeader>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-2 mx-auto">
              {selectedProduct?.isPhysical ? (
                <Truck className="w-6 h-6 text-amber-600" />
              ) : (
                <FileText className="w-6 h-6 text-amber-600" />
              )}
            </div>
            <DialogTitle className="text-center font-serif text-2xl font-bold text-slate-900">Product Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {selectedProduct && (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">{selectedProduct.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mt-1.5 tracking-wide">{selectedProduct.medium} Medium</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Overview</Label>
                  <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto">
                    {selectedProduct.description || "No description provided for this product."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class</span>
                    <span className="font-bold text-slate-700">{selectedProduct.class}th Grade</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Format</span>
                    <span className="font-bold text-slate-700">{selectedProduct.isPhysical ? "Home Delivery" : "PDF Download"}</span>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Price</span>
                  <div className="text-right">
                    {selectedProduct?.offerPrice && selectedProduct.offerPrice > 0 ? (
                      <div>
                        <span className="text-2xl font-serif font-bold text-slate-900">₹{selectedProduct.offerPrice}</span>
                        <span className="text-sm text-slate-400 line-through ml-2">₹{selectedProduct.price}</span>
                        <span className="block text-[9px] font-extrabold text-green-700 mt-0.5">
                          {Math.round(((selectedProduct.price - selectedProduct.offerPrice) / selectedProduct.price) * 100)}% DISCOUNT
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-serif font-bold text-slate-900">₹{selectedProduct?.price}</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="mt-2">
            {selectedProduct?.isPhysical ? (
              <Button 
                onClick={() => {
                  setIsViewDialogOpen(false);
                  addToCart(selectedProduct!);
                }} 
                className="w-full bg-primary text-white rounded-2xl font-bold h-12 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Add to Cart
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleBuyDirect(selectedProduct!);
                }} 
                disabled={selectedProduct ? selectedProduct.stock < 1 : true}
                className="w-full bg-primary text-white rounded-2xl font-bold h-12 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Buy Now
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog (Razorpay Direct Checkout) */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] bg-[#fdfcf8] border-none shadow-2xl">
          <DialogHeader className="items-center text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
            <DialogTitle className="font-serif text-2xl font-bold text-slate-900">Confirm Purchase</DialogTitle>
            <DialogDescription className="italic text-slate-500 text-xs">
              Please verify your phone number for secure delivery tracking and direct WhatsApp receipt.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Active Phone Number
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-12 rounded-xl border-slate-200 bg-white text-base font-bold tracking-widest focus:ring-amber-500/20"
                placeholder="10-digit mobile number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={confirmPurchase} 
              disabled={isProcessing}
              className="w-full h-12 bg-[#0b1f3c] hover:bg-[#0b1f3c]/90 text-white rounded-xl font-bold shadow-xl transition-all active:scale-95"
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
