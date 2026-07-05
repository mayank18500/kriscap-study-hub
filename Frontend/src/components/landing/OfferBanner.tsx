import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OfferBannerProps {
  onViewStore: () => void;
}

const BANNERS = [
  {
    id: 1,
    image: "/Banner/banner1.png",
    alt: "Study Material Store Offer",
    action: "store"
  },
  {
    id: 2,
    image: "/Banner/banner2.png",
    alt: "Watch Live Tutorials on YouTube",
    action: "youtube"
  }
];

const OfferBanner = ({ onViewStore }: OfferBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5500); // 5.5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const handleBannerClick = (action: string) => {
    if (action === "store") {
      onViewStore();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (action === "youtube") {
      window.open("https://youtube.com", "_blank");
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // pixels to trigger swipe
    if (info.offset.x < -swipeThreshold) {
      // Swiped left -> next slide
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swiped right -> prev slide
      setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-slate-100 flex flex-col items-center">
      <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[16/5] w-full group cursor-grab active:cursor-grabbing overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onTap={() => handleBannerClick(BANNERS[currentIndex].action)}
            className="absolute inset-0 w-full h-full select-none touch-pan-y"
          >
            <img
              src={BANNERS[currentIndex].image}
              alt={BANNERS[currentIndex].alt}
              className="w-full h-full object-cover pointer-events-none"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="py-3 flex gap-2 justify-center bg-white w-full border-b border-slate-100">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-primary w-6" : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
