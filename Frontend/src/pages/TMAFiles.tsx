import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Eye, ShoppingCart, Star, Loader2 } from "lucide-react";
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

const TMAFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMedium, setSelectedMedium] = useState("all");
  const { user } = useAuth();
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

  const handleBuy = async (product: Product) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to purchase files.",
      });
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Razorpay SDK failed to load. Check your connection.",
      });
      return;
    }

    try {
      // 1. Create Order
      const { data: orderData } = await api.post("/api/orders/create", {
        productId: product._id,
        amount: product.price,
      });

      // 2. Open Razorpay
      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kriscap Education",
        description: `Purchase ${product.name}`,
        order_id: orderData.id, // Razorpay Order ID
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            await api.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast({
              title: "Success",
              description: "Payment successful! Your file is ready to download.",
            });
            // Ideally invalidate queries or redirect to downloads
          } catch (verifyError) {
            toast({
              variant: "destructive",
              title: "Payment Verification Failed",
              description: "Please contact support if money was deducted.",
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0F172A", // Primary color
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while initiating purchase.",
      });
    }
  };

  const filteredFiles = products?.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    const matchesMedium = selectedMedium === "all" || file.medium === selectedMedium;
    return matchesSearch && matchesClass && matchesMedium;
  }) || [];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMedium} onValueChange={setSelectedMedium}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mediums</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="card-hover h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Class {file.class}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {file.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {file.medium} Medium • TMA File
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{file.rating || 0}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({file.reviews || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-primary">
                    ₹{file.price}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={() => handleBuy(file)}>
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Buy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No files found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default TMAFiles;
