import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Package, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const categories = [
    {
      icon: FileText,
      title: "TMA Solutions",
      subtitle: "Instant Digital Access",
      description: "Expertly crafted Tutor Marked Assignments. Download verified answers instantly and secure your marks without the stress.",
      features: ["Verified by Experts", "Bilingual Support", "2025-26 Updated", "PDF Format"],
      cta: "Browse TMA Library",
      link: "/tma-files",
      accent: "amber",
    },
    {
      icon: Package,
      title: "Handwritten Projects",
      subtitle: "Curated Home Delivery",
      description: "Complete, physically prepared project files delivered to your doorstep. Tailored specifically for your chosen subjects.",
      features: ["Doorstep Delivery", "Handwritten Quality", "Ready to Submit", "Tracked Shipping"],
      cta: "Order Physical Files",
      link: "/project-files",
      accent: "slate",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative side element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-amber-500/20 rounded-r-full hidden lg:block" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-600 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3 block">
            Our Academic Services
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
            Expert Resources for <span className="italic text-amber-600">NIOS Success</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 md:mb-6 rounded-full" />
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            High-quality study materials designed to streamline your learning journey and maximize your academic performance.
          </p>
        </motion.div>

        {/* Flex scroll on mobile, Grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6 px-4 -mx-6 md:grid md:grid-cols-2 md:gap-8 lg:gap-12 max-w-5xl mx-auto md:px-0 md:mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-auto snap-center"
            >
              <div className="relative bg-gradient-to-b from-white to-slate-50/50 rounded-[20px] border border-slate-100 p-6 md:p-10 h-full transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                
                {/* Background Icon Watermark */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  <category.icon size={120} strokeWidth={1} />
                </div>

                <div>
                  {/* Icon Box */}
                  <div className={`w-12 h-12 rounded-2xl ${index === 0 ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'} flex items-center justify-center mb-6 shadow-md transition-transform duration-500`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  
                  {/* Titles */}
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1.5">
                    {category.title}
                  </h3>
                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-4 ${index === 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                    {category.subtitle}
                  </p>
                  <p className="text-slate-650 leading-relaxed mb-6 text-sm">
                    {category.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {category.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-slate-750">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${index === 0 ? 'text-amber-500' : 'text-slate-400'}`} />
                        <span className="font-semibold text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action (Height 44px min for touch targets) */}
                <div>
                  <Link to={category.link}>
                    <Button
                      variant="outline"
                      className={`w-full h-11 rounded-xl border font-bold transition-all duration-300 ${
                        index === 0 
                        ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                        : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      {category.cta}
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;