import { motion } from "framer-motion";
import { Search, CreditCard, Download, CheckCircle, GraduationCap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      number: "I",
      title: "Select Curriculum",
      description: "Browse our curated library and select the TMA or Project file specific to your subject, class, and preferred medium.",
    },
    {
      icon: CreditCard,
      number: "II",
      title: "Secure Enrollment",
      description: "Complete your transaction through our encrypted gateway supporting UPI, Cards, and Net Banking with instant receipt.",
    },
    {
      icon: Download,
      number: "III",
      title: "Instant Fulfillment",
      description: "Access your digital TMA files immediately or track your professionally bound projects delivered to your doorstep.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Classical Background Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 mb-6">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">
              The Path to Excellence
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Our Methodical <span className="italic text-amber-400 font-medium">Approach</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Three disciplined steps to securing your academic success with Kriscap Education.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Golden Line - Desktop Only */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative text-center group"
            >
              {/* Icon Orb */}
              <div className="relative mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-slate-800 border border-amber-500/20 flex items-center justify-center transition-all duration-500 group-hover:border-amber-500/60 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] relative z-10">
                  <step.icon className="w-10 h-10 text-amber-500" />
                </div>
                {/* Roman Numeral Badge */}
                <div className="absolute -top-2 right-[30%] w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 text-xs font-bold border-4 border-slate-900 z-20">
                  {step.number}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="font-serif text-2xl font-bold text-white mb-4 transition-colors group-hover:text-amber-400">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-20"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-slate-300 font-medium tracking-wide italic">
                Supporting the aspirations of 10,000+ NIOS Scholars
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;