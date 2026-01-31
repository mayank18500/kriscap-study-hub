import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Package, ShieldCheck, Zap, ArrowRight, Star } from "lucide-react";

const Hero = () => {
  const trustBadges = [
    { icon: ShieldCheck, text: "Verified Content" },
    { icon: BookOpen, text: "NIOS Curriculum" },
    { icon: Star, text: "4.9/5 Rating" },
  ];

  return (
    <section className="relative min-h-[80vh] lg:min-h-screen flex items-center bg-[#fdfcf8] overflow-hidden pt-16 lg:pt-20">
      {/* Classical Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Right Content: The Image (Now appears first on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center items-center order-first lg:order-last"
          >
            {/* Decorative Golden Ring */}
            <div className="absolute inset-0 border-[1px] border-amber-200 rounded-full scale-90 animate-[spin_20s_linear_infinite] opacity-50" />

            <div className="relative z-10 w-full max-w-[240px] sm:max-w-[320px] md:max-w-[450px] lg:max-w-[500px]">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white p-3 md:p-4 group">
                <img
                  src="./krish_logo.jpeg"
                  alt="NIOS Study Excellence"
                  className="w-full h-auto rounded-4xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Stat Card Overlay (Hidden on very small mobile for cleanliness) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 -left-4 md:bottom-10 md:-left-6 bg-white shadow-2xl rounded-2xl p-3 md:p-4 border border-slate-100 hidden xs:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[8px] md:text-[10px] uppercase tracking-wider text-slate-400 font-bold">Success Rate</p>
                      <p className="text-sm md:text-lg font-bold text-slate-900 font-serif">99.8% Passed</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Left Content: Typography Focused */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left mt-2 lg:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6 lg:mb-8 shadow-xl shadow-slate-900/10"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              India's Premier NIOS Resource
            </motion.div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-4 lg:mb-8">
              Academic Excellence <br />
              <span className="text-amber-600 italic font-medium">Simplified.</span>
            </h1>

            <p className="text-slate-600 text-base md:text-xl mb-6 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Premium TMA solutions and professionally crafted Project Files. Designed by experts to help NIOS students achieve top marks with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center lg:justify-start mb-10 lg:mb-12">
              <Link to="/tma-files">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 lg:h-14 text-sm lg:text-base shadow-lg hover:shadow-slate-900/20 transition-all hover:-translate-y-1 group">
                  Get TMA Files
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/project-files">
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-full px-8 h-12 lg:h-14 text-sm lg:text-base">
                  <Package className="mr-2 w-4 h-4" />
                  Project Files
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Minimalist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 border-t border-slate-200 pt-8"
            >
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2.5 text-slate-500">
                  <div className="p-1.5 rounded-full bg-amber-50">
                    <badge.icon className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-[10px] md:text-sm font-semibold tracking-tight uppercase">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Elegant Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;