import { motion } from "framer-motion";
import { Target, ShieldCheck, Wallet, Headphones, Star, Clock, GraduationCap } from "lucide-react";

const WhyUs = () => {
  const reasons = [
    {
      icon: Target,
      title: "NIOS-Specific Precision",
      description: "Every module is architected strictly according to the latest NIOS curriculum and exam marking schemes.",
    },
    {
      icon: ShieldCheck,
      title: "Academic Veracity",
      description: "Our materials undergo a rigorous double-verification process by senior subject matter experts.",
    },
    {
      icon: Wallet,
      title: "Student-Centric Value",
      description: "Providing elite educational resources at prices that respect the financial realities of distance learners.",
    },
    {
      icon: Headphones,
      title: "Concierge Support",
      description: "Direct access to our dedicated academic support desk via WhatsApp for personalized guidance.",
    },
    {
      icon: Clock,
      title: "Instant Fulfillment",
      description: "Our automated delivery system ensures your digital TMA files are accessible the moment you enroll.",
    },
    {
      icon: Star,
      title: "Superior Quality",
      description: "Properly formatted, well-researched, and professionally presented content that commands respect.",
    },
  ];

  return (
    <section className="py-24 bg-[#fdfcf8] border-y border-slate-100 relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-amber-500" />
            <GraduationCap className="w-5 h-5 text-amber-600" />
            <div className="h-[1px] w-8 bg-amber-500" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Pillars of <span className="italic text-amber-600">Distinction</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            What sets Kriscap Education apart is our unwavering commitment to academic integrity and student success.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left group"
            >
              {/* Icon with Subtle Classic Glow */}
              <div className="mb-6 relative">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-amber-500/10 group-hover:border-amber-200 transition-all duration-500">
                  <reason.icon className="w-6 h-6 text-slate-800 group-hover:text-amber-600 transition-colors" />
                </div>
                {/* Number Indicator - Subtle Serif */}
                <span className="absolute -top-2 -right-2 font-serif italic text-xs text-amber-600 opacity-50">
                  0{index + 1}
                </span>
              </div>

              {/* Text Content */}
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                {reason.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {reason.description}
              </p>
              
              {/* Decorative underline on hover */}
              <div className="mt-6 w-8 h-[1px] bg-slate-200 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-slate-100 text-center"
        >
          <p className="font-serif italic text-slate-400 text-sm tracking-wide">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;