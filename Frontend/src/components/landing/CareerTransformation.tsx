import { Shield, Atom, User, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "nios-results",
    title: "NIOS Results",
    icon: Shield,
    color: "blue",
    borderClass: "border-[#4A8BE8]",
    bgFade: "from-[#F0F5FF] to-white",
    btnColor: "bg-[#215EBA] hover:bg-[#1A4B95]",
    iconBg: "bg-[#4A8BE8]",
    link: "/results/nios",
  },
  {
    id: "iit-jee-results",
    title: "IIT-JEE Results",
    icon: Atom,
    color: "purple",
    borderClass: "border-[#9B51E0]",
    bgFade: "from-[#F7F0FF] to-white",
    btnColor: "bg-[#9B51E0] hover:bg-[#7E3EB6]",
    iconBg: "bg-[#9B51E0]",
    link: "/results/iit-jee",
  },
  {
    id: "agniveer-results",
    title: "Agniveer Results",
    icon: User,
    color: "orange",
    borderClass: "border-[#F2994A]",
    bgFade: "from-[#FFF6F0] to-white",
    btnColor: "bg-[#F2994A] hover:bg-[#D88135]",
    iconBg: "bg-[#F2994A]",
    link: "/results/agniveer",
  },
];

const CareerTransformation = () => {
  return (
    <section className="pt-2 pb-12 bg-white font-sans text-center">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl font-bold text-black inline-block px-4">
          Career Transformation: Our Results & Placements
        </h2>
        
        {/* Thick black line directly below the text */}
        <div className="w-full h-[3px] bg-black max-w-4xl mx-auto mt-1 mb-3"></div>
        
        <p className="text-gray-700 font-medium mb-8 text-[15px]">
          Select Category to View Details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-2xl border-[3px] ${cat.borderClass} bg-gradient-to-b ${cat.bgFade} p-6 flex flex-col items-center shadow-sm relative`}
            >
              <div 
                 className={`w-14 h-14 rounded-full ${cat.iconBg} flex items-center justify-center text-white mb-4 shadow-md relative mt-2`}
              >
                <cat.icon className="w-7 h-7" />
                {cat.id === "nios-results" && (
                   <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-blue-700 text-[10px] font-bold flex items-center justify-center rounded-full border border-gray-100 shadow-sm leading-none pt-px">S</span>
                )}
              </div>
              
              <h3 className="text-[22px] font-bold text-black mb-6 flex-grow">
                {cat.title}
              </h3>
              
              <Link
                to={cat.link}
                className={`w-full py-2.5 rounded-lg text-white font-medium ${cat.btnColor} transition-colors flex items-center justify-center`}
              >
                View Details <span className="ml-1 text-lg leading-none">›</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTransformation;
