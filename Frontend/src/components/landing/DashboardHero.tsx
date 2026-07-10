import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, FileCheck2, GraduationCap, Library, Star, ArrowRight } from "lucide-react";

const dashboardCards = [
  {
    title: "Admission",
    description: "Streamlined enrollment support",
    icon: <BookOpen className="w-8 h-8" />,
    color: "text-blue-600",
    bg: "bg-blue-50/50 hover:bg-blue-50",
    border: "border-blue-100",
    link: "/admission"
  },
  {
    title: "TMA",
    description: "Verified assignments",
    icon: <FileText className="w-8 h-8" />,
    color: "text-emerald-600",
    bg: "bg-emerald-50/50 hover:bg-emerald-50",
    border: "border-emerald-100",
    link: "/store?filter=tma"
  },
  {
    title: "Practical",
    description: "Complete practical files",
    icon: <FileCheck2 className="w-8 h-8" />,
    color: "text-purple-600",
    bg: "bg-purple-50/50 hover:bg-purple-50",
    border: "border-purple-100",
    link: "/store?filter=practical"
  },
  {
    title: "Viva",
    description: "Preparation guides",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "text-amber-600",
    bg: "bg-amber-50/50 hover:bg-amber-50",
    border: "border-amber-100",
    link: "/store"
  },
  {
    title: "Study Material",
    description: "Notes & PYQs",
    icon: <Library className="w-8 h-8" />,
    color: "text-sky-600",
    bg: "bg-sky-50/50 hover:bg-sky-50",
    border: "border-sky-100",
    link: "/store"
  },
  {
    title: "Complete Package",
    description: "End-to-end guidance",
    icon: <Star className="w-8 h-8" />,
    color: "text-indigo-600",
    bg: "bg-indigo-50/50 hover:bg-indigo-50",
    border: "border-indigo-100",
    link: "/admission?package=true"
  }
];

const DashboardHero = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container-tight relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6">
              Your Academic Partner
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">NIOS Support Hub</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Helping students succeed from Admission to Result with verified study materials and expert guidance.
            </p>
          </motion.div>
        </div>

        {/* Dashboard Style Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={card.link} className="block h-full group">
                <div className={`h-full p-6 rounded-[24px] border ${card.border} ${card.bg} glass transition-all duration-300 group-hover:-translate-y-1 shadow-sm group-hover:shadow-md flex flex-col items-center text-center space-y-4`}>
                  <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">{card.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
