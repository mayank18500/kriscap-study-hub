import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, FileText, TrendingUp, HeadphonesIcon } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: StatItem[] = [
  {
    icon: <Users className="w-7 h-7" />,
    value: 5000,
    suffix: "+",
    label: "Students Enrolled",
    color: "text-blue-400",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    value: 1200,
    suffix: "+",
    label: "TMAs Delivered",
    color: "text-amber-400",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    color: "text-green-400",
  },
  {
    icon: <HeadphonesIcon className="w-7 h-7" />,
    value: 24,
    suffix: "×7",
    label: "Student Support",
    color: "text-purple-400",
  },
];

function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isActive, target, duration]);

  return count;
}

function StatCard({ stat, isActive, delay }: { stat: StatItem; isActive: boolean; delay: number }) {
  const count = useCountUp(stat.value, isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-2 px-6 py-6 border-r border-white/10 last:border-r-0"
    >
      <div className={`${stat.color} mb-1`}>{stat.icon}</div>
      <div className="flex items-end gap-0.5">
        <span className="text-4xl md:text-5xl font-black text-white tabular-nums leading-none">
          {count.toLocaleString()}
        </span>
        <span className={`text-2xl md:text-3xl font-black ${stat.color} leading-none mb-0.5`}>
          {stat.suffix}
        </span>
      </div>
      <p className="text-slate-400 text-sm font-medium text-center">{stat.label}</p>
    </motion.div>
  );
}

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-[#0b1f3c] border-t border-b border-white/5" ref={ref}>
      <div className="w-full px-6 md:px-12 max-w-none">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} isActive={isInView} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
