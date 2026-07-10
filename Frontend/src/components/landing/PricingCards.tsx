import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";

const PricingCards = () => {
  return (
    <section className="py-20 bg-slate-50" id="pricing">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Choose the support package that best fits your academic needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Package */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Essential Support</h3>
              <p className="text-slate-500 text-sm">Perfect for self-guided students</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">Custom</span>
              <span className="text-slate-500 ml-2">/ service</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Individual TMA PDFs', 'Specific Practical Files', 'Basic Guidance', 'Standard Delivery'].map((feature) => (
                <li key={feature} className="flex items-center text-slate-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a 
              href="https://wa.me/919999999999" 
              className="w-full py-4 px-6 rounded-xl border-2 border-slate-200 text-slate-900 font-bold text-center hover:bg-slate-50 transition-colors"
            >
              View Pricing
            </a>
          </motion.div>

          {/* Premium Package */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-xl relative flex flex-col transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                🔥 Complete Package
              </span>
            </div>
            <div className="mb-6 mt-4">
              <h3 className="text-xl font-bold text-white mb-2">Full Academic Support</h3>
              <p className="text-slate-400 text-sm">From admission to final results</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">All-Inclusive</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Complete Admission Support', 'All TMA Files Upload', 'Physical Practical Notebooks', 'Viva Preparation Kit', 'Priority 24/7 WhatsApp Support'].map((feature) => (
                <li key={feature} className="flex items-center text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a 
              href="https://wa.me/919999999999" 
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-center transition-all flex items-center justify-center shadow-lg shadow-emerald-900/50"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Book on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
