import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is NIOS and why should I choose it?",
    a: "NIOS (National Institute of Open Schooling) is a government-recognized board that offers Class 10 and 12 certifications for students who want to study at their own pace. It is ideal for working students, those who failed in regular boards, or those who want to pursue non-traditional paths. NIOS certificates are valid for all college admissions and government jobs.",
  },
  {
    q: "What are TMAs and how do they work in NIOS?",
    a: "TMA stands for Tutor Marked Assignment. NIOS requires students to submit TMAs for each subject as part of their evaluation — they contribute 20% to your final score. Our TMA solutions are expertly crafted as per NIOS guidelines and are available in both digital (PDF) and physical (handwritten) formats.",
  },
  {
    q: "How quickly can I download my purchased files?",
    a: "Digital downloads are instant — as soon as your payment is verified, you'll receive access to your files in the 'My Downloads' section of your account. PDF files can be downloaded and printed immediately.",
  },
  {
    q: "Are the project files eligible as per NIOS standards?",
    a: "Yes, absolutely. All our project files are created strictly following the latest NIOS project guidelines for each subject. We also offer handwritten project files with all required sections, charts, and presentation formatting that NIOS expects.",
  },
  {
    q: "How does physical home delivery work?",
    a: "After placing an order for physical project files, we prepare and dispatch your order within 2–3 business days. Delivery typically takes 4–7 days depending on your location. You can track your order through the 'My Orders' section.",
  },
  {
    q: "Can I get support if I have doubts about NIOS subjects?",
    a: "Yes! We provide 24×7 WhatsApp support for all enrolled students. You can also join our live classes where expert educators address doubts in real time. Our counselors are available for admission-related queries as well.",
  },
  {
    q: "What subjects and classes do you cover?",
    a: "We cover all major subjects for NIOS Class 10 and Class 12, including Mathematics, Science, Social Science, Hindi, English, Commerce subjects, Humanities subjects, and many optional subjects. Contact us for specific subject availability.",
  },
  {
    q: "Is my payment secure on Kriscap?",
    a: "Yes. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway trusted by thousands of Indian businesses. We support UPI, Net Banking, Credit/Debit Cards, and Wallets. We never store your payment details.",
  },
];

function FAQItem({ question, answer, idx, isOpen, onClick }: {
  question: string;
  answer: string;
  idx: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-blue-200 transition-colors"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-900 text-sm md:text-base">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-blue-600" : "text-slate-400"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="h-px bg-slate-100 mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="w-full px-6 md:px-12 max-w-none">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            FAQs
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b1f3c] mb-4">
            Frequently Asked{" "}
            <span className="text-[#2563EB]">Questions</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Have more questions? Reach us on WhatsApp — we typically respond within minutes.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.q}
              answer={faq.a}
              idx={idx}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <p className="text-slate-600 font-medium mb-3">Still have a question?</p>
          <a
            href="https://wa.me/917023057797"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
          >
            💬 Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
