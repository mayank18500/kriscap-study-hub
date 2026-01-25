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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative side element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-amber-500/20 rounded-r-full hidden lg:block" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Our Academic Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Expert Resources for <span className="italic text-amber-600">NIOS Success</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full" />
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            High-quality study materials designed to streamline your learning journey and maximize your academic performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative bg-[#fdfcf8] rounded-[2rem] border border-slate-100 p-8 lg:p-12 h-full transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] hover:-translate-y-2 overflow-hidden">
                {/* Background Accent Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <category.icon size={160} strokeWidth={1} />
                </div>

                {/* Header */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${index === 0 ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'} flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-serif text-3xl font-bold text-slate-900 mb-2">
                    {category.title}
                  </h3>
                  <p className={`text-sm font-bold tracking-widest uppercase mb-6 ${index === 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                    {category.subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                    {category.description}
                  </p>
                </div>

                {/* Feature List */}
                <div className="relative z-10 space-y-4 mb-10">
                  {category.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 className={`w-5 h-5 ${index === 0 ? 'text-amber-500' : 'text-slate-400'}`} />
                      <span className="font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <div className="relative z-10">
                  <Link to={category.link}>
                    <Button
                      variant="outline"
                      className={`w-full h-14 rounded-full border-2 font-bold transition-all duration-300 ${
                        index === 0 
                        ? 'border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                        : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      {category.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
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