import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, HelpCircle, Lightbulb, BookMarked, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESOURCES = [
  {
    icon: FileText,
    title: "Free TMA Samples",
    description: "Download sample TMA solutions for all NIOS subjects to understand the format and requirements.",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    count: "50+ Samples",
  },
  {
    icon: HelpCircle,
    title: "Previous Year Papers",
    description: "Practice with actual NIOS board exam papers from the last 5 years across all subjects.",
    tag: "High Value",
    tagColor: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    count: "10 Years Archive",
  },
  {
    icon: Lightbulb,
    title: "Study Tips & Strategy",
    description: "Expert-written guides on how to prepare effectively for NIOS examinations in limited time.",
    tag: "Expert Curated",
    tagColor: "bg-green-100 text-green-700",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    count: "20+ Guides",
  },
  {
    icon: BookMarked,
    title: "Career Guidance Blogs",
    description: "Read about career paths after NIOS — from college admissions to professional certifications.",
    tag: "Career Focus",
    tagColor: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    count: "30+ Articles",
  },
  {
    icon: Target,
    title: "Exam Strategy Guides",
    description: "Subject-wise last minute revision plans and time management strategies for board exams.",
    tag: "Exam Ready",
    tagColor: "bg-rose-100 text-rose-700",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    count: "15+ Strategies",
  },
];

const FreeResources = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="w-full px-6 md:px-12 max-w-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              100% Free
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0b1f3c]">
              Free Resources{" "}
              <span className="text-[#16A34A]">For You</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-md">
              Start learning today with our curated free materials. No registration required.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-6 border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0"
            onClick={() => window.open("https://wa.me/917023057797", "_blank")}
          >
            Get More Resources <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Resource Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => window.open("https://wa.me/917023057797", "_blank")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${resource.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${resource.iconColor}`} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${resource.tagColor}`}>
                    {resource.tag}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">{resource.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{resource.count}</span>
                  <span className="text-[#2563EB] text-sm font-bold group-hover:gap-2 flex items-center gap-1 transition-all">
                    Access Free <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-gradient-to-br from-[#0b1f3c] to-[#1e3a5f] rounded-2xl p-6 flex flex-col justify-between text-white"
          >
            <div>
              <h3 className="font-black text-xl mb-3">Want Personalized Study Help?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Talk to our academic counselors who will create a custom study plan tailored to your needs and exam schedule.
              </p>
            </div>
            <a
              href="https://wa.me/917023057797"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
            >
              <span>📱</span> WhatsApp a Counselor
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeResources;
