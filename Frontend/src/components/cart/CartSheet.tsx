import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Trash2, ShoppingCart, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { loadRazorpayScript } from "@/lib/razorpay";
import { Loader2, ShieldCheck } from "lucide-react";

export const CartSheet = () => {
    const { items, removeFromCart, isOpen, setIsOpen, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Checkout State
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckoutInit = () => {
        if (!user) {
            navigate("/login");
            setIsOpen(false);
            return;
        }

        if (items.length === 0) return;

        // Auto-fill address
        if (user.addresses && user.addresses.length > 0) {
            const lastAddr = user.addresses[user.addresses.length - 1];
            setAddress(lastAddr.addressLine1 || "");
            setPincode(lastAddr.pincode || "");
            setCity(lastAddr.city || "");
            setState(lastAddr.state || "");
        }
        setPhoneNumber(user.phoneNumber || "");

        // Close cart sheet and open address dialog
        setIsOpen(false);
        setIsAddressOpen(true);
    };

    const handleProcessPayment = async () => {
        if (!address || !pincode || !city || !state || !phoneNumber) {
            toast({ variant: "destructive", title: "Missing Details", description: "Please complete all shipping information." });
            return;
        }

        setIsProcessing(true);
        try {
            // 1. Update/Save Address
            await api.post("/api/user/address", {
                addresses: [{ addressLine1: address, pincode, city, state, isDefault: true }]
            });

            // 2. Load Razorpay
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) throw new Error("Payment gateway failed.");

            // 3. Create Order (Using Updated Backend API)
            const productPayload = items.map(item => ({
                product: item._id,
                quantity: 1 // Logic for multiplicity can be added later
            }));

            const { data: orderData } = await api.post("/api/orders/create", {
                products: productPayload, // Refactored API expects this
                amount: totalPrice,
                phoneNumber: phoneNumber
            });

            // 4. Open Razorpay
            const options = {
                key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Kriscap Education",
                description: `Cart Checkout (${items.length} items)`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        await api.post("/api/payments/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        toast({ title: "Order Confirmed", description: "Your shipment is being prepared." });
                        clearCart();
                        setIsAddressOpen(false);
                    } catch (verifyError) {
                        toast({ variant: "destructive", title: "Verification Failed", description: "Please contact support." });
                    }
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: "#0F172A" },
            };

            const paymentObject = new (window as any).Razorpay(options);
            // Defer Razorpay DOM injection until React has finished its current flush
            requestAnimationFrame(() => paymentObject.open());

        } catch (error: any) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Checkout Error",
                description: error.response?.data?.message || error.message || "Could not finalize transaction."
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
                    <SheetHeader>
                        <SheetTitle className="font-serif text-2xl font-bold flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6" /> Your Folio
                        </SheetTitle>
                        <SheetDescription>
                            Review your physical project files before arranging shipment.
                        </SheetDescription>
                    </SheetHeader>

                    <ScrollArea className="flex-1 my-6 pr-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
                                <Package className="w-12 h-12 mb-4 opacity-20" />
                                <p>Your folio is currently empty.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.cartId} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center border border-slate-100 shrink-0">
                                            <Package className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-slate-500 italic mb-2">Class {item.class} • {item.medium}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-serif font-bold text-slate-700">₹{item.price}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => removeFromCart(item.cartId)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="font-bold text-slate-700">₹{totalPrice - (items.length > 0 ? 150 : 0)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Delivery Fee</span>
                                <span className="font-bold text-slate-700">₹{items.length > 0 ? 150 : 0}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Valuation</span>
                                <span className="font-serif text-3xl font-bold text-slate-900">₹{totalPrice}</span>
                            </div>
                        </div>
                        <Button
                            className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
                            disabled={items.length === 0}
                            onClick={handleCheckoutInit}
                        >
                            Proceed to Shipment
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Shipment/Address Dialog for Checkout */}
            <Dialog open={isAddressOpen} onOpenChange={setIsAddressOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-[2rem] bg-[#fdfcf8] border-none shadow-2xl overflow-hidden p-0">
                    <div className="bg-gradient-to-r from-[#0b1f3c] to-[#1e3a5f] p-8 text-white relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Truck size={100} />
                        </div>
                        <DialogTitle className="font-serif text-3xl font-bold mb-2">Checkout Delivery</DialogTitle>
                        <DialogDescription className="text-slate-400 italic">
                            Finalize shipment for {items.length} folio items.
                        </DialogDescription>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Delivery Address</Label>
                            <Textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white min-h-[100px] focus:ring-amber-500/20"
                                placeholder="House Number, Street, Landmarks..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">City</Label>
                                <Input value={city} onChange={(e) => setCity(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Pincode</Label>
                                <Input value={pincode} onChange={(e) => setPincode(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">State</Label>
                                <Input value={state} onChange={(e) => setState(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Contact Phone</Label>
                                <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-0">
                        <Button
                            onClick={handleProcessPayment}
                            disabled={isProcessing}
                            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : `Pay ₹${totalPrice}`}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
