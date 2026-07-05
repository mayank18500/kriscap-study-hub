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
      { text: "Book Free Counseling", link: "https://wa.me/917023057797", primary: false, external: true }
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
    transition={{ delay: 0.8, duration: 0.5 }}
    className="mt-8 flex flex-wrap items-center gap-4 text-sm"
  >
    <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
      <span className="text-white font-medium">4.9/5 Rating</span>
    </div>
    <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
      <Users className="w-4 h-4 text-blue-400" />
      <span className="text-white font-medium">50,000+ Students</span>
    </div>
    <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
      <ShieldCheck className="w-4 h-4 text-green-400" />
      <span className="text-white font-medium">Verified Platform</span>
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
    }, 5500); // 5.5 seconds per slide
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div 
          className="relative rounded-[40px] overflow-hidden shadow-2xl min-h-[550px] bg-[#122b3e]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between z-0"
              style={{ backgroundColor: HERO_SLIDES[currentIndex].bgHex }}
            >
              <div className="p-10 md:p-14 lg:p-20 flex-1 w-full max-w-2xl relative z-20 flex flex-col justify-center h-full">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6"
                  dangerouslySetInnerHTML={{ __html: HERO_SLIDES[currentIndex].title }}
                />
                <p className="text-slate-300 text-lg sm:text-xl max-w-md mb-8 leading-relaxed font-medium">
                  {HERO_SLIDES[currentIndex].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {HERO_SLIDES[currentIndex].buttons.map((btn, idx) => (
                    btn.external ? (
                      <a key={idx} href={btn.link} target="_blank" rel="noopener noreferrer">
                        <Button variant={btn.primary ? "default" : "outline"} className={`w-full sm:w-auto rounded-full px-8 h-14 font-bold text-[15px] transition-all ${btn.primary ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20' : 'border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50'}`}>
                          {btn.text}
                        </Button>
                      </a>
                    ) : (
                      <Link key={idx} to={btn.link}>
                        <Button variant={btn.primary ? "default" : "outline"} className={`w-full sm:w-auto rounded-full px-8 h-14 font-bold text-[15px] transition-all ${btn.primary ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20' : 'border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50'}`}>
                          {btn.text}
                        </Button>
                      </Link>
                    )
                  ))}
                </div>
                
                {/* Trust Indicators */}
                <TrustIndicators />
              </div>

              {/* Background Image Container */}
              <div className="absolute inset-0 md:relative md:inset-auto md:flex-1 w-full h-full min-h-[350px] md:min-h-full z-10">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-left-top opacity-50 md:opacity-95"
                  style={{ backgroundImage: HERO_SLIDES[currentIndex].bgImage }}
                />
                
                {/* Mobile Gradient (Bottom to Top) */}
                <div 
                  className="absolute inset-0 md:hidden" 
                  style={{ 
                    background: `linear-gradient(to top, ${HERO_SLIDES[currentIndex].bgHex} 15%, ${HERO_SLIDES[currentIndex].bgHex}E6 50%, transparent 100%)` 
                  }} 
                />
                
                {/* Desktop Gradient (Left to Right) */}
                <div 
                  className="hidden md:block absolute inset-0"
                  style={{ 
                    background: `linear-gradient(to right, ${HERO_SLIDES[currentIndex].bgHex} 0%, ${HERO_SLIDES[currentIndex].bgHex}D9 40%, transparent 80%)` 
                  }} 
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? "w-8 h-2.5 bg-blue-500" 
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
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