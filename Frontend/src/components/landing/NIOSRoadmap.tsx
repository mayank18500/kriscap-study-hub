import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ClipboardList, BookOpen, FileCheck, Briefcase,
  GraduationCap, Trophy, Rocket, Star,
} from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "NIOS Admission",
    description: "Register with NIOS for Class 10 or 12. Get guidance from our counselors on choosing the right subjects.",
    color: "bg-blue-600",
    ringColor: "ring-blue-200",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Study Materials",
    description: "Download premium notes, TMA samples, and previous year papers crafted by expert educators.",
    color: "bg-purple-600",
    ringColor: "ring-purple-200",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "TMA Submission",
    description: "Get perfectly crafted TMA solutions — handwritten or digital — delivered to your door or inbox.",
    color: "bg-amber-600",
    ringColor: "ring-amber-200",
  },
  {
    icon: Briefcase,
    step: "04",
    title: "Project Work",
    description: "Receive complete project files as per NIOS guidelines. Physical delivery available nationwide.",
    color: "bg-rose-600",
    ringColor: "ring-rose-200",
  },
  {
    icon: GraduationCap,
    step: "05",
    title: "Exam Preparation",
    description: "Attend live classes, solve practice papers, and get expert doubt-clearing support before exams.",
    color: "bg-teal-600",
    ringColor: "ring-teal-200",
  },
  {
    icon: Trophy,
    step: "06",
    title: "Board Examination",
    description: "Walk into your NIOS board exam with complete confidence backed by thorough preparation.",
    color: "bg-green-600",
    ringColor: "ring-green-200",
  },
  {
    icon: Star,
    step: "07",
    title: "Results",
    description: "Achieve the score you deserve. Our 98% success rate speaks for itself.",
    color: "bg-yellow-500",
    ringColor: "ring-yellow-200",
  },
  {
    icon: Rocket,
    step: "08",
    title: "Career Growth",
    description: "Use your NIOS certificate as a stepping stone to college admissions, jobs, and professional success.",
    color: "bg-indigo-600",
    ringColor: "ring-indigo-200",
  },
];

const NIOSRoadmap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="w-full px-6 md:px-12 max-w-none" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Your Journey Map
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0b1f3c] mb-4">
            The NIOS{" "}
            <span className="text-[#2563EB]">Success Roadmap</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            From admission to career growth — we guide you every step of the way on your NIOS journey.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step Number */}
                <span className="absolute top-4 right-4 text-5xl font-black text-slate-50 select-none leading-none">
                  {step.step}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 ring-4 ${step.ringColor} ring-opacity-50 shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector arrow for non-last items in row */}
                {idx < STEPS.length - 1 && (idx + 1) % 4 !== 0 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-7 h-7 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <span className="text-slate-400 text-xs font-black">→</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Need help starting your journey?{" "}
            <a
              href="https://wa.me/917023057797"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] font-bold hover:underline"
            >
              Chat with us on WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NIOSRoadmap;
