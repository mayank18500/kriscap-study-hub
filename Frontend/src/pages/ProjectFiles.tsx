import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Search, 
  Package, 
  Eye, 
  ShoppingCart, 
  Star, 
  Truck, 
  Loader2, 
  GraduationCap, 
  ShieldCheck, 
  Box, 
  Heart, 
  Download,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Product } from "@/types/product";
import { useDebounce } from "@/hooks/use-debounce";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { loadRazorpayScript } from "@/lib/razorpay";

const ProjectFiles = () => {
  const [searchParams] = useSearchParams();
  const formatParam = searchParams.get("type"); // "digital" | "physical"
  
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const debouncedSearch = useDebounce(searchQuery, 300);
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDeliveryTab, setSelectedDeliveryTab] = useState<'digital' | 'physical'>(
    formatParam === "physical" ? "physical" : "digital"
  );
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Wishlist Mutations
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

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "PROJECT"],
    queryFn: async () => {
      const response = await api.get<Product[]>("/api/products", {
        params: { type: "PROJECT" }
      });
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
        prefill: { name: user.name, email: user.email },
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

  const filteredFiles = products?.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    
    const matchesDelivery = 
      (selectedDeliveryTab === "digital" && !file.isPhysical) || 
      (selectedDeliveryTab === "physical" && file.isPhysical);

    const matchesCategory = selectedCategoryFilter === "all" || file.category === selectedCategoryFilter;

    return matchesSearch && matchesClass && matchesDelivery && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-6 pt-4 md:pt-0">
      {/* Back Button */}
      <div>
        <button 
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-slate-600 dark:text-slate-300 font-bold text-sm hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all shadow-sm hover:shadow-md"
        >
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </div>
          Back to Hub
        </button>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
            <Box className="w-3 h-3" /> Scholarly Center
          </div>
          <h1 className="font-serif text-4xl font-bold text-slate-900">Project Files Catalog</h1>
          <p className="text-slate-500 italic leading-relaxed max-w-xl">
            Custom-made digital project PDF guides and beautifully bound physical files delivered pan-India.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#fdfcf8] border border-slate-100 p-4 rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <Truck className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Delivery Status</p>
            <p className="text-sm font-bold text-slate-900">Digital (Instant) | Physical (3-5 Days)</p>
          </div>
        </div>
      </div>

      {/* Category Tabs Selection */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 border border-slate-200/50">
          <button
            onClick={() => setSelectedDeliveryTab('digital')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              selectedDeliveryTab === 'digital'
                ? 'bg-white text-[#0b1f3c] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            PDF Download
          </button>
          <button
            onClick={() => setSelectedDeliveryTab('physical')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              selectedDeliveryTab === 'physical'
                ? 'bg-white text-[#0b1f3c] shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Home Delivery
          </button>
        </div>
      </div>

      {/* Search & Filter Ledger */}
      <div className="sticky top-20 z-30 bg-[#fdfcf8]/80 backdrop-blur-md py-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search subject project files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-slate-200 rounded-xl font-medium focus:ring-amber-500/20"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px] h-12 rounded-xl border-slate-200 font-bold text-slate-600 bg-white">
                <SelectValue placeholder="Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
              <SelectTrigger className="w-[140px] h-12 rounded-xl border-slate-200 font-bold text-slate-600 bg-white">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="TEXT">Text / Normal</SelectItem>
                <SelectItem value="HANDWRITTEN">Handwritten</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id || file._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card
                className="group relative h-full bg-white border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                onClick={() => {
                  setSelectedProduct(file);
                  setIsViewDialogOpen(true);
                }}
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!user) {
                      toast({ title: "Login Required", description: "Please login to add items to wishlist" });
                      return;
                    }
                    const productId = file.id || file._id;
                    if (isInWishlist(productId)) {
                      removeFromWishlistMutation.mutate(productId);
                    } else {
                      addToWishlistMutation.mutate(productId);
                    }
                  }}
                  className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(file.id || file._id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>

                <CardContent className="p-4 sm:p-8">
                  <div className="flex items-start justify-between mb-4 sm:mb-8">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 ${
                      file.isPhysical ? 'bg-amber-500 text-white' : 'bg-slate-900 text-amber-400'
                    }`}>
                      {file.isPhysical ? (
                        <Truck className="w-5 h-5 sm:w-7 sm:h-7" />
                      ) : (
                        <Package className="w-5 h-5 sm:w-7 sm:h-7" />
                      )}
                    </div>
                    <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-500 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase self-start mr-8 sm:mr-0">
                      Class {file.class}
                    </span>
                  </div>

                  <div className="mb-4 sm:mb-8 min-h-[60px] sm:min-h-[90px]">
                    <h3 className="font-serif text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {file.name}
                    </h3>
                    
                    <div className="flex flex-col gap-1.5 mt-2">
                      {file.isPhysical ? (
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs italic">
                          <Truck className="w-3.5 h-3.5 text-amber-500" />
                          <span>Direct Home Delivery</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs italic">
                          <Download className="w-3.5 h-3.5 text-blue-500" />
                          <span>Instant PDF Download</span>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider ${
                          file.isPhysical ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {file.isPhysical ? 'Home Delivery' : 'Digital PDF'}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider ${
                          (file.copyrightStatus || 'NON_COPYRIGHT') === 'NON_COPYRIGHT'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {(file.copyrightStatus || 'NON_COPYRIGHT') === 'NON_COPYRIGHT' ? 'No Copy' : 'Copyright'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-50">
                    <div>
                      <span className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        {file.isPhysical ? "Price & Shipping" : "Download Price"}
                      </span>
                      <div className="text-lg sm:text-2xl font-serif font-bold text-slate-900">
                        ₹{file.price}
                      </div>
                    </div>
                    <div>
                      {file.isPhysical ? (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(file);
                          }} 
                          className="rounded-2xl bg-primary hover:bg-primary/90 text-white w-10 h-10 p-0 sm:w-auto sm:px-6 sm:py-2 font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center"
                        >
                          <ShoppingCart className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Add to Cart</span>
                        </Button>
                      ) : (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyDirect(file);
                          }} 
                          disabled={file.stock < 1}
                          className="rounded-2xl bg-primary hover:bg-primary/90 text-white w-10 h-10 p-0 sm:w-auto sm:px-6 sm:py-2 font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
                        >
                          <Download className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">{file.stock > 0 ? "Enroll" : "Void"}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-[3rem] bg-white">
          <GraduationCap className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-slate-400">Project Not Cataloged</h3>
          <p className="text-slate-400 italic">Adjust your search parameters to browse our project files.</p>
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
                <Package className="w-6 h-6 text-amber-600" />
              )}
            </div>
            <DialogTitle className="text-center font-serif text-2xl font-bold text-slate-900">Project Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {selectedProduct && (
              <>
                <div className="text-center mb-4">
                  <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug">{selectedProduct.name}</h3>
                  <p className="text-slate-500 italic text-sm mt-1">{selectedProduct.medium} Medium</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</Label>
                  <div className="p-4 bg-white rounded-xl border border-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto">
                    {selectedProduct.description || "No description provided for this project."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class</span>
                    <span className="font-bold text-slate-700">{selectedProduct.class}th Grade</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery</span>
                    <span className="font-bold text-slate-700">{selectedProduct.isPhysical ? "Home Delivery" : "Digital PDF"}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing</span>
                  <span className="font-serif text-2xl font-bold text-slate-900">₹{selectedProduct.price}</span>
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
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
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

export default ProjectFiles;