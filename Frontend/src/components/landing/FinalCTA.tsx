import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_POINTS = [
  "Free 30-minute counseling session",
  "No commitment required",
  "Expert guidance on NIOS admissions",
  "Subject selection advice",
  "Study plan tailored to your schedule",
];

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0b1f3c] via-[#0e2a50] to-[#1e3a5f] overflow-hidden relative">
      {/* Decorative blur orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 md:px-12 max-w-none relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="text-amber-400 text-sm">🎓</span>
            <span className="text-white/90 text-sm font-medium">Free Counseling Available</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
          >
            Still Confused About{" "}
            <br className="hidden md:block" />
            Your{" "}
            <span className="text-amber-400">NIOS Journey?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-lg max-w-xl mx-auto mb-10"
          >
            Talk to our expert counselors — they've helped thousands of students find the right path. It's completely free.
          </motion.p>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
          >
            {TRUST_POINTS.map((point, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-slate-300 text-sm">{point}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/917023057797?text=Hi%2C%20I%20need%20help%20with%20my%20NIOS%20journey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full px-8 h-14 text-base shadow-xl shadow-green-500/20 hover:-translate-y-1 transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp a Counselor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>

            <a href="tel:+917023057797">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50 font-bold rounded-full px-8 h-14 text-base hover:-translate-y-1 transition-all"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                Call +91 70230 57797
              </Button>
            </a>
          </motion.div>

          {/* Response time */}
          <p className="text-slate-400 text-sm mt-8">
            ⚡ Average response time: <span className="text-green-400 font-bold">under 5 minutes</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
