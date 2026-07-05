import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart, Star, Download, ArrowRight, FileText, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

interface FeaturedProduct {
  id: string;
  name: string;
  type: string;
  price: number;
  offerPrice: number;
  rating: number;
  downloads: number;
  thumbnailUrl: string;
  badge?: string;
  badgeColor?: string;
  isPhysical: boolean;
}

const FEATURED: FeaturedProduct[] = [
  {
    id: "feat-1",
    name: "NIOS Class 12 — All Subjects TMA Bundle",
    type: "TMA",
    price: 999,
    offerPrice: 599,
    rating: 4.9,
    downloads: 2400,
    thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&auto=format&fit=crop&q=80",
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
    isPhysical: false,
  },
  {
    id: "feat-2",
    name: "NIOS Class 10 — Science Project File",
    type: "PROJECT",
    price: 499,
    offerPrice: 299,
    rating: 4.8,
    downloads: 1800,
    thumbnailUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&auto=format&fit=crop&q=80",
    badge: "New",
    badgeColor: "bg-green-500",
    isPhysical: false,
  },
  {
    id: "feat-3",
    name: "NIOS Class 12 — Hindi Medium Complete Pack",
    type: "TMA",
    price: 799,
    offerPrice: 499,
    rating: 4.7,
    downloads: 3200,
    thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&auto=format&fit=crop&q=80",
    badge: "Top Rated",
    badgeColor: "bg-blue-500",
    isPhysical: false,
  },
  {
    id: "feat-4",
    name: "NIOS Project File — Home Delivery (Handwritten)",
    type: "PROJECT",
    price: 699,
    offerPrice: 449,
    rating: 4.9,
    downloads: 890,
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&auto=format&fit=crop&q=80",
    badge: "🚚 Home Delivery",
    badgeColor: "bg-purple-500",
    isPhysical: true,
  },
];

function ProductCard({ product, idx, isInView }: { product: FeaturedProduct; idx: number; isInView: boolean }) {
  const { addToCart } = useCart();
  const discount = product.offerPrice > 0
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      _id: product.id,
      name: product.name,
      price: product.offerPrice || product.price,
      isPhysical: product.isPhysical,
      type: product.type as 'TMA' | 'PROJECT',
      class: '12',
      medium: 'English',
      subject: 'Science',
      stock: 100,
      offerPrice: product.offerPrice
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: idx * 0.1 }}
      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide`}>
            {product.badge}
          </span>
        )}

        {/* Type */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {product.isPhysical ? (
            <Folder className="w-3.5 h-3.5 text-white" />
          ) : (
            <FileText className="w-3.5 h-3.5 text-white" />
          )}
          <span className="text-white text-[10px] font-bold uppercase tracking-wide">
            {product.type} — {product.isPhysical ? "Physical" : "Digital"}
          </span>
        </div>

        {/* Discount pill */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 line-clamp-2">{product.name}</h3>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Download className="w-3.5 h-3.5" />
            <span className="text-xs">{product.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-xl font-black text-[#0b1f3c]">
            ₹{(product.offerPrice || product.price).toLocaleString()}
          </span>
          {product.offerPrice > 0 && (
            <span className="text-sm text-slate-400 line-through">₹{product.price.toLocaleString()}</span>
          )}
        </div>

        {/* CTA */}
        <Button
          onClick={handleAdd}
          size="sm"
          className="w-full rounded-xl bg-[#0b1f3c] hover:bg-[#1e3a5f] text-white font-bold h-10 text-xs"
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

const FeaturedProducts = ({ onViewStore }: { onViewStore?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="w-full px-6 md:px-12 max-w-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Top Products
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0b1f3c]">
              Most Popular{" "}
              <span className="text-[#2563EB]">Study Files</span>
            </h2>
            <p className="text-slate-500 mt-2">
              Trusted by thousands of NIOS students across India.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-6 border-slate-200 text-slate-700 hover:bg-slate-100 shrink-0 font-bold"
            onClick={onViewStore}
          >
            View All Products <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} isInView={isInView} />
          ))}
        </div>

        {/* Trust Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">✅ Instant Downloads</span>
          <span className="flex items-center gap-1.5">🔒 Secure Payment via Razorpay</span>
          <span className="flex items-center gap-1.5">📦 Physical Delivery Available</span>
          <span className="flex items-center gap-1.5">💬 24×7 WhatsApp Support</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
