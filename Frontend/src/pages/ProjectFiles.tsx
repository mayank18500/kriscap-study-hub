import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Eye, ShoppingCart, Star, Truck, Loader2, MapPin } from "lucide-react";
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming this exists or use Input for now
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "@/types/product";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

import { useDebounce } from "@/hooks/use-debounce";

const ProjectFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedClass, setSelectedClass] = useState("all");
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", "PROJECT"],
    queryFn: async () => {
      const response = await api.get<Product[]>("/api/products", {
        params: { type: "PROJECT" }
      });
      return response.data;
    },
  });

  const handleOrderClick = (product: Product) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to order files.",
      });
      return;
    }
    setSelectedProduct(product);

    // Check if user has saved address
    setPhoneNumber(user.phoneNumber || ""); // Get number

    if (user.addresses && user.addresses.length > 0) {
      // Use saved address directly
      setIsAddressOpen(true); // Open dialog anyway to confirm phone and address? Or just phone dialog?
      // Since ProjectFiles requires Address, we use the same dialog.
    } else {
      setIsAddressOpen(true);
    }
  };

  const handleProcessOrder = async (product: Product, isNewAddress = false) => {
    setIsProcessing(true);
    try {
      if (isNewAddress) {
        // Save New Address
        await api.post("/api/user/address", {
          addresses: [{
            addressLine1: address,
            pincode,
            city,
            state,
            isDefault: true
          }]
        });
      }

      // Load Razorpay
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) throw new Error("Razorpay SDK failed to load");

      // Create Order
      const { data: orderData } = await api.post("/api/orders/create", {
        productId: product._id,
        amount: product.price,
        addressId: "latest",
        phoneNumber: phoneNumber
      });

      // Open Razorpay
      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kriscap Education",
        description: `Order ${product.name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            await api.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast({
              title: "Success",
              description: "Order placed successfully! We will ship it soon.",
            });
            setIsAddressOpen(false);
          } catch (verifyError) {
            toast({ variant: "destructive", title: "Payment Verification Failed", description: "Please contact support." });
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#0F172A" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      // Handle ADDRESS_REQUIRED specifically if we somehow missed it
      if (error.response?.data?.code === "ADDRESS_REQUIRED") {
        toast({ variant: "destructive", title: "Address Required", description: "Please add a shipping address." });
        setIsAddressOpen(true);
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to process order." });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!address || !pincode || !city || !state) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill in all address details." });
      return;
    }
    if (selectedProduct) {
      await handleProcessOrder(selectedProduct, true);
    }
  };

  const filteredFiles = products?.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    return matchesSearch && matchesClass;
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
        Failed to load projects. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Home Delivery Available</h3>
          <p className="text-sm text-muted-foreground">
            All project files are delivered to your doorstep within 3-5 business days.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Class {file.class}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {file.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete Project • Home Delivery
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{file.rating || 0}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({file.reviews || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">3-5 Days Delivery</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-secondary">
                    ₹{file.price}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleOrderClick(file)}>
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Order
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
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}

      {/* Address Dialog */}
      <Dialog open={isAddressOpen} onOpenChange={setIsAddressOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Shipping Details</DialogTitle>
            <DialogDescription>
              Enter your delivery address for this project file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="address">Address (House No, Street, Area)</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex. 123, Main Street"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New Delhi"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="110001"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Delhi"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="9876543210"
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isProcessing} onClick={handleConfirmOrder}>
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Make Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectFiles;
