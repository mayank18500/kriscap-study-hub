import { PenTool, Microscope, Users, HelpCircle, FileText, Mic, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const TargetToday = () => {
  const targets = [
    { id: 1, count: "1", label: "TMA", icon: PenTool, path: "/courses" },
    { id: 2, count: "2", label: "Practical", icon: Microscope, path: "/courses" },
    { id: 3, count: "3", label: "classes", icon: Users, path: "/admission" },
    { id: 4, count: "4", label: "Imp. Questions", icon: HelpCircle, path: "/courses" },
    { id: 5, count: "5", label: "Notes", icon: FileText, path: "/courses" },
    { id: 6, count: "6", label: "Viva", icon: Mic, path: "/courses" },
    { id: 7, count: "7", label: "PYQs with solutions", icon: BookOpen, path: "/courses" },
  ];

  return (
    <section className="py-8 bg-gray-50" id="target-today">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-[28px] font-bold text-center text-slate-900 mb-10">What is your Target Today ?</h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl mx-auto">
          {targets.map((target) => (
            <Link key={target.id} to={target.path} className="flex flex-col items-center gap-3 w-20 md:w-24 group cursor-pointer hover:no-underline">
              <div className="relative">
                <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-white shadow-sm border-[1.5px] border-slate-200 flex items-center justify-center text-slate-700 group-hover:border-primary group-hover:text-primary group-hover:shadow-md transition-all relative z-0">
                  <target.icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                {/* Number Badge Over Icon */}
                <span className="absolute -top-1 -left-1 md:-top-1.5 md:-left-1.5 bg-white text-slate-900 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-sm border border-slate-200 z-10 transition-transform duration-300 group-hover:scale-110">
                  {target.count}
                </span>
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-800 text-center leading-tight group-hover:text-primary transition-colors">
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
