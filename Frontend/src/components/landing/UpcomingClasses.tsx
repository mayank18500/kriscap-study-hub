import { Atom, Calculator, Calendar } from "lucide-react";

const UpcomingClasses = () => {
  const classes = [
    { id: 1, title: "Class 12 Physics", date: "12 Aug 2024, 9:00 PM", icon: Atom, color: "text-blue-600", bg: "bg-blue-50 border border-blue-100" },
    { id: 2, title: "Class 10 Math", date: "13 Aug 2024, 9:00 PM", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50 border border-blue-100" },
    { id: 3, title: "Class 12 Physics", date: "12 Aug 2024, 9:00 PM", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50 border border-blue-100" },
    { id: 4, title: "Class 10 Math", date: "13 Aug 2024, 9:00 PM", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50 border border-blue-100" },
  ];

  return (
    <section className="pt-10 pb-6 bg-gray-50 relative z-20" id="upcoming-classes">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-[22px] md:text-2xl font-bold text-slate-800 mb-5 ml-2">Upcoming Live Classes</h2>
        
        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar scrollbar-hide py-2">
          {classes.map((cls) => (
            <div key={cls.id} className="min-w-[260px] md:min-w-[280px] bg-white rounded-[1.25rem] p-4 shadow-sm hover:shadow-md border border-slate-100 flex items-center gap-4 snap-start cursor-pointer transition-all">
              <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center ${cls.bg}`}>
                <cls.icon className={`w-6 h-6 ${cls.color}`} />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[15px] text-slate-800 leading-tight">{cls.title}</h3>
                <p className="text-[13px] text-slate-500 mt-1">{cls.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingClasses;
