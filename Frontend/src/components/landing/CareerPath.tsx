import { Medal, Leaf, Atom, UserSearch } from "lucide-react";
import { Link } from "react-router-dom";

const paths = [
  {
    id: "nios",
    title: "NIOS",
    icon: Medal,
    badges: ["Class 10", "Class 12", "On-demand 12th"],
    bgTop: "bg-[#2D8CFF]",
    bgBottom: "bg-[#1B6AD5]",
    buttonText: "Launch Your Career →",
    link: "/nios",
  },
  {
    id: "bbose",
    title: "BBOSE",
    icon: Leaf,
    badges: ["Class 10", "Class 12"],
    bgTop: "bg-[#45B04A]",
    bgBottom: "bg-[#2E8B32]",
    buttonText: "Launch Your Career →",
    link: "/bbose",
  },
  {
    id: "iit-jee",
    title: "IIT-JEE",
    icon: Atom,
    badges: ["Class 11", "Class 12", "Dropper"],
    bgTop: "bg-[#A741E0]",
    bgBottom: "bg-[#8326B8]",
    buttonText: "Launch Your Career →",
    link: "/iit-jee",
  },
  {
    id: "govt-jobs",
    title: "Govt Job\nExams",
    icon: UserSearch,
    badges: ["Agniveer"],
    bgTop: "bg-[#FF9124]",
    bgBottom: "bg-[#E07200]",
    buttonText: "Explore Your Success →",
    link: "/govt-jobs",
  },
];

const CareerPath = () => {
  return (
    <section className="py-12 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Select Your Career Path
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paths.map((path) => (
            <div
              key={path.id}
              className="rounded-xl overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg transition-shadow relative"
            >
              {/* Top Section */}
              <div className={`${path.bgTop} p-6 pb-12 flex-grow relative`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[28px] leading-tight font-bold text-white whitespace-pre-line tracking-tight">
                    {path.title}
                  </h3>
                  <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
                    <path.icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-white">
                  {path.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 border border-white/40 bg-white/10 text-sm font-medium rounded opacity-90"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Section with wave SVG overlay on top edge */}
              <div className={`${path.bgBottom} relative pt-4 pb-4 px-6 mt-[-20px]`}>
                 <svg className={`absolute top-0 left-0 w-full h-[30px] -mt-[29px] text-${path.bgBottom.replace('bg-', '')}`} preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" fillOpacity="1" d="M0,128L80,149.3C160,171,320,213,480,218.7C640,224,800,192,960,181.3C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                 </svg>
                <Link
                  to={path.link}
                  className="block text-white font-medium text-sm text-center relative z-10"
                >
                  {path.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/careers"
            className="text-black font-semibold text-[17px] border-b-2 border-black pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-colors"
          >
            Explore All 25+ Career Tracks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerPath;
