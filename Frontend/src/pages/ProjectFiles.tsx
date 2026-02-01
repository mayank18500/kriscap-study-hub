import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Eye, ShoppingCart, Star, Truck, Loader2, MapPin, GraduationCap, ShieldCheck, Box, Heart } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Product } from "@/types/product";
import { useDebounce } from "@/hooks/use-debounce";
import { useCart } from "@/contexts/CartContext";

const ProjectFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      await api.post("/api/wishlist", { productId });
    },
    onSuccess: () => {
      toast({ title: "Added to wishlist", description: "Product saved to your wishlist." });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to add to wishlist." });
    },
  });
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Cart Context
  const { addToCart } = useCart();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "PROJECT"],
    queryFn: async () => {
      const response = await api.get<Product[]>("/api/products", {
        params: { type: "PROJECT" }
      });
      return response.data;
    },
  });

  const filteredFiles = products?.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    return matchesSearch && matchesClass;
  }) || [];

  if (isLoading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-amber-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
            <Truck className="w-3 h-3" /> Logistics Center
          </div>
          <h1 className="font-serif text-4xl font-bold text-slate-900">Physical Project Files</h1>
          <p className="text-slate-500 italic leading-relaxed max-w-xl">
            Custom-bound, hand-curated project files delivered across India. Verified scholarly content ready for submission.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#fdfcf8] border border-slate-100 p-4 rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <Box className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Dispatch Timeline</p>
            <p className="text-sm font-bold text-slate-900">3-5 Business Days</p>
          </div>
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
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-slate-200 font-bold text-slate-600 bg-white">
              <SelectValue placeholder="Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="10">Class 10</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        <AnimatePresence>
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                {/* Absolute Wishlist Button */}
                <button
                  className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlistMutation.mutate(file._id);
                  }}
                >
                  <Heart className="w-4 h-4" />
                </button>

                <CardContent className="p-4 sm:p-8">
                  <div className="flex items-start justify-between mb-4 sm:mb-8">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 flex items-center justify-center group-hover:bg-amber-500 group-hover:rotate-6 transition-all duration-500">
                      <Package className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 group-hover:text-slate-900" />
                    </div>
                    <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-500 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase self-start mr-8 sm:mr-0">
                      Class {file.class}
                    </span>
                  </div>

                  <div className="mb-4 sm:mb-8 min-h-[60px] sm:min-h-[90px]">
                    <h3 className="font-serif text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {file.name}
                    </h3>
                    <div className="flex items-center gap-2 sm:gap-3 text-slate-500 text-[10px] sm:text-xs italic">
                      <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Direct Home Delivery</span>
                      <span className="sm:hidden">Home Delivery</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-50">
                    <div>
                      <span className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase mb-1">Fee & Shipping</span>
                      <div className="text-lg sm:text-2xl font-serif font-bold text-slate-900">
                        ₹{file.price}
                      </div>
                    </div>
                    <div>
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        addToCart(file);
                      }} className="rounded-full bg-slate-900 hover:bg-slate-800 text-white w-10 h-10 p-0 sm:w-auto sm:px-6 sm:py-2 font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-[3rem]">
          <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-slate-400">Project Not Cataloged</h3>
          <p className="text-slate-400 italic">Adjust your search parameters to find the required subject project.</p>
        </div>
      )}

      {/* Product Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[2rem] bg-[#fdfcf8] border-none shadow-2xl">
          <DialogHeader>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <DialogTitle className="text-center font-serif text-2xl font-bold text-slate-900">Project Details</DialogTitle>
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
                    {selectedProduct.description || "No description provided for this project."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Class</span>
                    <span className="font-bold text-slate-700">{selectedProduct.class}th Grade</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</span>
                    <span className="font-bold text-slate-700">₹{selectedProduct.price}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              addToCart(selectedProduct!);
            }} className="w-full bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800">
              Add to Folio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectFiles;