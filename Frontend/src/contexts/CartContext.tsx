import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useToast } from "@/components/ui/use-toast";

interface CartItem extends Product {
    cartId: string; // Unique ID for cart item in case we want multiples (though logic likely 1 per file)
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    totalPrice: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("kriscap_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("kriscap_cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        if (product.type !== "PROJECT") {
            toast({
                variant: "destructive",
                title: "Incompatible Item",
                description: "Only Project files are eligible for the shipping cart. Please use Direct Buy for digital files."
            });
            return;
        }

        // Check if already in cart
        if (items.some(item => item._id === product._id)) {
            toast({
                title: "Already in Cart",
                description: "This project is already in your folios."
            });
            return;
        }

        const newItem: CartItem = { ...product, cartId: crypto.randomUUID() };
        setItems(prev => [...prev, newItem]);
        toast({
            title: "Added to Folio",
            description: `${product.name} ready for shipment.`
        });
        setIsOpen(true); // Auto open cart
    };

    const removeFromCart = (cartId: string) => {
        setItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
    // Fixed Delivery Charge of ₹150 if cart has items
    const deliveryFee = items.length > 0 ? 150 : 0;
    const totalPrice = itemsTotal + deliveryFee;

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
