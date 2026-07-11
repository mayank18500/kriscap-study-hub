import { Link } from "react-router-dom";
import { Label } from "recharts";
import {
  FileEdit,
  Microscope,
  Presentation,
  Atom,
  Mic,
  Star,
  ClipboardList,
  BookOpen,
  FileQuestion
} from "lucide-react";

const TargetToday = () => {
  const targets = [
    { id: 1, label: "1. TMA", icon: FileEdit, path: "/store" },
    { id: 2, label: "2. Practical", icon: Microscope, path: "/store" },
    { id: 3, label: "3. Classes", icon: Presentation, path: "/admission" },
    { id: 4, label: "4. PCB Classes", icon: Atom, path: "/store" },
    { id: 5, label: "5. Viva", icon: Mic, path: "/store" },
    { id: 6, label: "6. Special Materials", icon: Star, path: "/store" },
    { id: 7, label: "7. Test Series", icon: ClipboardList, path: "/store" },
    { id: 8, label: "8. Study Materials", icon: BookOpen, path: "/store" },
    { id: 9, label: "9. Imp. Questions", icon: FileQuestion, path: "/store" }
  ];

  return (
    <section className="pt-0 pb-3 bg-gray-50 dark:bg-slate-950" id="target-today">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-[28px] font-bold text-center text-slate-900 dark:text-slate-100 mb-6">What is your Target Today ?</h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl mx-auto">
          {targets.map((target) => (
            <Link key={target.id} to={target.path} className="flex flex-col items-center gap-3 w-20 md:w-24 group cursor-pointer hover:no-underline">
              <div className="relative">
                <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-white dark:bg-slate-900 shadow-sm border-[1.5px] border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:border-primary dark:group-hover:border-primary group-hover:text-primary dark:group-hover:text-primary group-hover:shadow-md transition-all relative z-0">
                  <target.icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                {/* Number Badge Over Icon */}
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200 text-center leading-tight group-hover:text-primary transition-colors">
                {target.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetToday;
