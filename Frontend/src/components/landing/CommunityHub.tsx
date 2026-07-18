import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Send, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



const CommunityHub = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-4 bg-slate-50 dark:bg-slate-950 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
            Student Community
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0b1f3c] dark:text-slate-100 mb-2">
            You're Not Alone{" "}
            <span className="text-[#2563EB]">in This Journey</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm">
            Join 25,000+ NIOS students who share resources, motivate each other, and celebrate results together.
          </p>
        </div>


        {/* Total Count Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-[#0b1f3c] to-[#1e3a5f] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <p className="text-white font-bold text-lg">25,000+ Students Trust Kriscap</p>
            <p className="text-slate-400 text-[10px] mt-0.5">Across all platforms, our community keeps growing every day.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-white text-[#0b1f3c] hover:bg-slate-100 font-bold rounded-full px-6 py-2 h-auto text-xs shrink-0"
              >
                Join Today →
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => window.open("https://wa.me/917023057797", "_blank")}
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">WhatsApp</span>
                  <span className="text-[10px] text-slate-500 font-medium">12k+ Members</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-1"
                onClick={() => window.open("https://t.me/kriscapvlogs", "_blank")}
              >
                <div className="w-8 h-8 rounded-full bg-[#0088cc]/10 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-[#0088cc]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Telegram</span>
                  <span className="text-[10px] text-slate-500 font-medium">8.5k+ Members</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHub;
