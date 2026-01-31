import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FileText, Eye, ShoppingCart, Star, Loader2, BookOpen, GraduationCap, CheckCircle, ShieldCheck } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "@/types/product";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const TMAFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMedium, setSelectedMedium] = useState("all");
  const { user } = useAuth();

  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", "TMA"],
    queryFn: async () => {
      const response = await api.get<Product[]>("/api/products", {
        params: { type: "TMA" }
      });
      return response.data;
    },
  });

  const handleBuy = (product: Product) => {
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
      toast({ variant: "destructive", title: "Invalid Phone Number", description: "Please enter a valid phone number." });
      return;
    }

    setIsProcessing(true);
    const product = selectedProduct!;

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast({ variant: "destructive", title: "Gateway Error", description: "Payment system failed to initialize." });
      setIsProcessing(false);
      return;
    }

    try {
      const { data: orderData } = await api.post("/api/orders/create", {
        products: [{ product: product._id, quantity: 1 }],
        amount: product.price,
        phoneNumber: phoneNumber
      });

      setIsPhoneDialogOpen(false);
      setIsProcessing(false);

      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kriscap Education",
        description: `Enrollment: ${product.name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            await api.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast({ title: "Purchase Complete", description: "Your archive is now available for download." });
          } catch (verifyError) {
            toast({ variant: "destructive", title: "Verification Failed", description: "Please contact support." });
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#0F172A" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast({ variant: "destructive", title: "Process Error", description: "Could not initiate purchase." });
      setIsProcessing(false);
    }
  };

  const filteredFiles = products?.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    const matchesMedium = selectedMedium === "all" || file.medium === selectedMedium;
    return matchesSearch && matchesClass && matchesMedium;
  }) || [];

  if (isLoading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-amber-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
            <BookOpen className="w-3 h-3" /> Digital Repository
          </div>
          <h1 className="font-serif text-4xl font-bold text-slate-900">TMA Study Materials</h1>
          <p className="text-slate-500 italic leading-relaxed max-w-xl">
            Professionally curated Tutor Marked Assignments designed to meet the rigorous standards of the NIOS curriculum.
          </p>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> 2025-26 Session Ready
          </div>
        </div>
      </div>

      {/* Navigation & Search Ledger */}
      <div className="sticky top-20 z-30 bg-[#fdfcf8]/80 backdrop-blur-md py-4 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Filter by subject (e.g. Physics, History)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-slate-200 rounded-xl font-medium focus:ring-amber-500/20"
            />
          </div>
          <div className="flex gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px] h-12 rounded-xl bg-white border-slate-200 font-bold text-slate-600">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMedium} onValueChange={setSelectedMedium}>
              <SelectTrigger className="w-[140px] h-12 rounded-xl bg-white border-slate-200 font-bold text-slate-600">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="all">All Mediums</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Archive Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card className="h-full bg-white border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:-translate-y-2">
                <CardContent className="p-8">
                  {/* Subject Badge & Class */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#fdfcf8] border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all duration-500">
                      <FileText className="w-7 h-7 text-slate-900 group-hover:text-amber-600" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Grade Level</span>
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-tighter">
                        Class {file.class}
                      </span>
                    </div>
                  </div>

                  {/* Subject Details */}
                  <div className="mb-8 min-h-[100px]">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {file.name}
                    </h3>
                    <p className="text-slate-500 text-sm italic">
                      {file.medium} Medium Section
                    </p>
                    {file.category && (
                      <div className="mt-2 flex gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${file.category === 'HANDWRITTEN'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                          {file.category} Format
                        </span>
                        {file.copyrightStatus && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${file.copyrightStatus === 'NON_COPYRIGHT'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            {file.copyrightStatus === 'NON_COPYRIGHT' ? 'No Copyright' : 'Copyright'}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < (file.rating || 4) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      ))}
                      <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified Solutions</span>
                    </div>
                  </div>

                  {/* Price & Action Ledger */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Enrollment Fee</span>
                      {file.offerPrice && file.offerPrice > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-slate-900">₹{file.offerPrice}</span>
                          <span className="text-xs text-slate-500 line-through">₹{file.price}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-slate-900">₹{file.price}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all" onClick={() => {
                        setSelectedProduct(file);
                        setIsViewDialogOpen(true);
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleBuy(file)} disabled={file.stock < 1} className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-6 font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {file.stock > 0 ? "Enroll" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                  {file.stock !== undefined && (
                    <div className="mt-2 text-[10px] font-bold text-right text-slate-400 uppercase tracking-widest">
                      {file.stock > 0 ? `Only ${file.stock} Left` : "Currently Unavailable"}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {
        filteredFiles.length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[3rem]">
            <GraduationCap className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-slate-400">Subject Not Found</h3>
            <p className="text-slate-400 italic">Adjust your filters to browse our academic archives.</p>
          </div>
        )
      }

      {/* Product Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[2rem] bg-[#fdfcf8] border-none shadow-2xl">
          <DialogHeader>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <DialogTitle className="text-center font-serif text-2xl font-bold text-slate-900">Product Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedProduct && (
              <>
                <div className="text-center mb-6">
                  <h3 className="font-serif text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
                  <p className="text-slate-500 italic text-sm">{selectedProduct.medium} Medium</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</Label>
                  <div className="p-4 bg-white rounded-xl border border-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedProduct.description || "No description provided for this product."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class</span>
                    <span className="font-bold text-slate-700">{selectedProduct.class}th Grade</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</span>
                    <div className="flex items-center gap-2 mb-4">
                      {selectedProduct?.offerPrice && selectedProduct.offerPrice > 0 ? (
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-slate-900">₹{selectedProduct.offerPrice}</span>
                            <span className="text-xl text-slate-500 line-through">₹{selectedProduct.price}</span>
                          </div>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {Math.round(((selectedProduct.price - selectedProduct.offerPrice) / selectedProduct.price) * 100)}% DISCOUNT
                          </span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-slate-900">₹{selectedProduct?.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              handleBuy(selectedProduct!);
            }} className="w-full bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled={selectedProduct ? selectedProduct.stock < 1 : true}>
              Enroll Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Folio (Dialog) */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] bg-[#fdfcf8] border-none shadow-2xl">
          <DialogHeader className="items-center text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6 text-amber-600" />
            </div>
            <DialogTitle className="font-serif text-2xl font-bold text-slate-900">Confirm Enrollment</DialogTitle>
            <DialogDescription className="italic text-slate-500">
              Please verify your contact details to proceed with the secure digital delivery.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Active Phone Number
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-14 rounded-xl border-slate-200 bg-white text-lg font-bold tracking-widest focus:ring-amber-500/20"
                placeholder="10-digit mobile number"
              />
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-[10px] leading-relaxed text-amber-800">
                Your number will be used for delivery tracking and support. We follow strict data privacy protocols.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={confirmPurchase} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-900/10 transition-all active:scale-95">
              {isProcessing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : "Authorize & Proceed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
};

const PhoneCall = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
)

export default TMAFiles;