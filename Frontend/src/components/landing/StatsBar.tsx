import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, HeadphonesIcon, ShieldCheck, Star } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    icon: <Users className="w-6 h-6" />,
    value: 5000,
    suffix: "+",
    label: "Students Assisted",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    value: 24,
    suffix: "×7",
    label: "Dedicated Support",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    value: 100,
    suffix: "%",
    label: "Genuine Services",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: 4.9,
    suffix: "/5",
    label: "Student Rating",
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
      const eased = 1 - Math.pow(1 - progress, 3);
      
      // Handle decimals for rating
      if (target % 1 !== 0) {
        setCount(Number((eased * target).toFixed(1)));
      } else {
        setCount(Math.floor(eased * target));
      }
      
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
      className="flex flex-col items-center gap-3 px-6 py-8 border-r border-slate-100 last:border-r-0"
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
        {stat.icon}
      </div>
      <div className="flex items-baseline gap-1 text-slate-900">
        <span className="text-4xl md:text-5xl font-black tabular-nums tracking-tight">
          {count}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-blue-600">
          {stat.suffix}
        </span>
      </div>
      <p className="text-slate-500 font-medium text-center uppercase tracking-wider text-xs">{stat.label}</p>
    </motion.div>
  );
}

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-white border-y border-slate-200" ref={ref}>
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} isActive={isInView} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
