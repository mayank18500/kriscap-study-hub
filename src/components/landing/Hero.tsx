import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Package, ShieldCheck, Zap, Truck } from "lucide-react";

const Hero = () => {
  const trustBadges = [
    { icon: ShieldCheck, text: "Secure Payments" },
    { icon: BookOpen, text: "NIOS Focused" },
    { icon: Truck, text: "Fast Delivery" },
  ];

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="container-wide relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              Trusted by 10,000+ NIOS Students
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              NIOS Study Material
              <br />
              <span className="text-accent">You Can Trust</span>
            </h1>
            
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Instant TMA Downloads & Home-Delivered Project Files. Get verified study materials designed specifically for NIOS students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link to="/tma-files">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  <BookOpen className="w-5 h-5" />
                  Buy TMA Files
                </Button>
              </Link>
              <Link to="/project-files">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  <Package className="w-5 h-5" />
                  Order Project Files
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-primary-foreground/70"
                >
                  <badge.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6"
              >
                <div className="text-4xl font-bold text-accent mb-2">10K+</div>
                <div className="text-primary-foreground/70">Happy Students</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6"
              >
                <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                <div className="text-primary-foreground/70">TMA Files</div>
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6"
              >
                <div className="text-4xl font-bold text-primary-foreground mb-2">100+</div>
                <div className="text-primary-foreground/70">Project Files</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6"
              >
                <div className="text-4xl font-bold text-accent mb-2">4.9★</div>
                <div className="text-primary-foreground/70">Student Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
