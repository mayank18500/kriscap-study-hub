import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Users } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    bgHex: "#0f172a", // Darker slate/navy for a more premium look
    bgImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop')",
    title: "Become NIOS Board Exam <span class='text-amber-400'>Ready...</span>",
    subtitle: "Join the registered institute delivering verifiable curriculum insights and immediate certification preparation.",
    buttons: [
      { text: "Start Admission", link: "/admission", primary: true },
      { text: "Counseling", link: "https://wa.me/917023057797", primary: false, external: true }
    ]
  },
  {
    id: 2,
    bgHex: "#122b3e", // Navy Blue
    bgImage: "url('/img/hero-student.png')",
    title: "Interactive Daily<br />Live Classes",
    subtitle: "Engage with expert educators in real-time. Step up your game with India's best interactive learning platform.",
    buttons: [
      { text: "View Schedule", link: "/courses", primary: true },
      { text: "Learn More", link: "/about", primary: false }
    ]
  },
  {
    id: 3,
    bgHex: "#0f2c25", // Deep forest green
    bgImage: "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop')",
    title: "Comprehensive<br />Study Materials",
    subtitle: "Access over 50,000+ notes, handwritten guides, and comprehensive past exam analysis to boost your scores.",
    buttons: [
      { text: "Access Library", link: "/courses", primary: true },
      { text: "Contact Us", link: "/contact", primary: false }
    ]
  }
];

const TrustIndicators = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="mt-6 flex flex-wrap items-center gap-2 text-[11px] md:text-sm"
  >
    <div className="flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      <span className="text-white font-semibold">4.9/5 Rating</span>
    </div>
    <div className="flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
      <Users className="w-3.5 h-3.5 text-blue-400" />
      <span className="text-white font-semibold">50k+ Students</span>
    </div>
    <div className="flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
      <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
      <span className="text-white font-semibold">Verified</span>
    </div>
  </motion.div>
);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (info.offset.x > swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
  };

  return (
    <section className="pt-4 pb-6 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div 
          className="relative rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] min-h-[500px] md:min-h-[550px] bg-slate-900 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between z-0 select-none touch-pan-y"
              style={{ backgroundColor: HERO_SLIDES[currentIndex].bgHex }}
            >
              {/* Content Panel */}
              <div className="p-8 md:p-14 lg:p-20 flex-1 w-full max-w-2xl relative z-20 flex flex-col justify-center h-full text-left">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-4 tracking-tight"
                  dangerouslySetInnerHTML={{ __html: HERO_SLIDES[currentIndex].title }}
                />
                <motion.p 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-slate-300 text-sm sm:text-lg max-w-md mb-6 leading-relaxed font-medium"
                >
                  {HERO_SLIDES[currentIndex].subtitle}
                </motion.p>
                
                {/* Touch friendly actions (Min height 44px) */}
                <motion.div 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex gap-3 w-full sm:w-auto"
                >
                  {HERO_SLIDES[currentIndex].buttons.map((btn, idx) => (
                    btn.external ? (
                      <a key={idx} href={btn.link} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                        <Button 
                          variant={btn.primary ? "default" : "outline"} 
                          className={`w-full sm:w-auto rounded-full px-6 h-12 font-bold text-xs transition-all ${
                            btn.primary 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/10' 
                              : 'border-white/20 text-white bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {btn.text}
                        </Button>
                      </a>
                    ) : (
                      <Link key={idx} to={btn.link} className="flex-1 sm:flex-none">
                        <Button 
                          variant={btn.primary ? "default" : "outline"} 
                          className={`w-full sm:w-auto rounded-full px-6 h-12 font-bold text-xs transition-all ${
                            btn.primary 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/10' 
                              : 'border-white/20 text-white bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {btn.text}
                        </Button>
                      </Link>
                    )
                  ))}
                </motion.div>
                
                {/* Trust Indicators */}
                <TrustIndicators />
              </div>

              {/* Background Image Panel (Parallax & Scale effect) */}
              <div className="absolute inset-0 md:relative md:inset-auto md:flex-1 w-full h-full min-h-[250px] md:min-h-full z-10 overflow-hidden">
                <motion.div 
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-left-top opacity-35 md:opacity-90 pointer-events-none"
                  style={{ backgroundImage: HERO_SLIDES[currentIndex].bgImage }}
                />
                
                {/* Mobile Gradient (Bottom to Top) */}
                <div 
                  className="absolute inset-0 md:hidden" 
                  style={{ 
                    background: `linear-gradient(to top, ${HERO_SLIDES[currentIndex].bgHex} 30%, ${HERO_SLIDES[currentIndex].bgHex}CC 65%, transparent 100%)` 
                  }} 
                />
                
                {/* Desktop Gradient (Left to Right) */}
                <div 
                  className="hidden md:block absolute inset-0"
                  style={{ 
                    background: `linear-gradient(to right, ${HERO_SLIDES[currentIndex].bgHex} 0%, ${HERO_SLIDES[currentIndex].bgHex}B3 50%, transparent 90%)` 
                  }} 
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Dots (Nothing OS style pills) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === currentIndex 
                    ? "w-6 bg-blue-500" 
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;