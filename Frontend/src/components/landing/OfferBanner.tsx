import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OfferBannerProps {
  onViewStore: () => void;
}

const BANNERS = [
  {
    id: 0,
    image: "/Banner/banner0.png",
    alt: "Latest Admission Offer",
    action: "admission"
  },
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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleBannerClick = (action: string) => {
    if (action === "store") {
      onViewStore();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (action === "youtube") {
      window.open("https://youtube.com", "_blank");
    } else if (action === "admission") {
      window.location.href = "/admission";
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

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  return (
    <div className="w-full px-4 pt-4 pb-1 bg-white flex flex-col items-center">
      <div
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[16/5] cursor-grab active:cursor-grabbing overflow-hidden rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onClick={() => handleBannerClick(BANNERS[currentIndex].action)}
            className="absolute inset-0 w-full h-full select-none touch-pan-y"
          >
            <img
              src={BANNERS[currentIndex].image}
              alt={BANNERS[currentIndex].alt}
              className="w-full h-full object-contain pointer-events-none"
              loading="eager"
            />
            {/* Premium soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-slate-800 shadow-sm opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 hover:bg-white flex items-center justify-center"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-slate-800 shadow-sm opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 hover:bg-white flex items-center justify-center"
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Nothing OS style pills indicator */}
      <div className="mt-2 flex gap-1.5 justify-center">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-slate-900 w-6" : "bg-slate-200 w-1.5"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
