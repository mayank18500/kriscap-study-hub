import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Send, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLATFORMS = [
  {
    name: "WhatsApp Community",
    icon: MessageCircle,
    members: "12,000+",
    description:
      "Join our active WhatsApp community. Get instant answers, share resources, and connect with students preparing for NIOS exams.",
    color: "bg-[#25D366]",
    textColor: "text-[#25D366]",
    borderColor: "border-[#25D366]/20",
    bgLight: "bg-[#25D366]/5",
    link: "https://wa.me/917023057797",
    cta: "Join WhatsApp",
    emoji: "💬",
  },
  {
    name: "Telegram Channel",
    icon: Send,
    members: "8,500+",
    description:
      "Subscribe to our Telegram channel for daily study tips, exam alerts, free resource drops, and important NIOS notifications.",
    color: "bg-[#0088cc]",
    textColor: "text-[#0088cc]",
    borderColor: "border-[#0088cc]/20",
    bgLight: "bg-[#0088cc]/5",
    link: "https://t.me/kriscapvlogs",
    cta: "Join Telegram",
    emoji: "📢",
  }
];

const CommunityHub = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-8 bg-slate-50 dark:bg-slate-950" ref={ref}>
      <div className="w-full px-6 md:px-12 max-w-none">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Student Community
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0b1f3c] dark:text-slate-100 mb-4">
            You're Not Alone{" "}
            <span className="text-[#2563EB]">in This Journey</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
            Join 25,000+ NIOS students who share resources, motivate each other, and celebrate results together.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLATFORMS.map((platform, idx) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`bg-white dark:bg-slate-900 border ${platform.borderColor} rounded-2xl p-8 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Icon + Members */}
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                    <span>{platform.emoji}</span>
                  </div>
                  <div className={`${platform.bgLight} ${platform.borderColor} border rounded-full px-3 py-1`}>
                    <span className={`text-xs font-bold ${platform.textColor}`}>{platform.members} Members</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-2">{platform.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{platform.description}</p>
                </div>

                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 ${platform.color} text-white font-bold py-3 px-5 rounded-full text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all`}
                >
                  <Icon className="w-4 h-4" />
                  {platform.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Total Count Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 bg-gradient-to-r from-[#0b1f3c] to-[#1e3a5f] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <div>
            <p className="text-white font-black text-2xl">25,000+ Students Trust Kriscap</p>
            <p className="text-slate-400 text-sm mt-1">Across all platforms, our community keeps growing every day.</p>
          </div>
          <Button
            className="bg-white text-[#0b1f3c] hover:bg-slate-100 font-bold rounded-full px-8 shrink-0"
            onClick={() => window.open("https://wa.me/917023057797", "_blank")}
          >
            Join Today →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHub;
