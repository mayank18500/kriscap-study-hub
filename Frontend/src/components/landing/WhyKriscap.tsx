import React from 'react';
import { 
  BookOpen, 
  Users, 
  Youtube, 
  Video, 
  Scale, 
  Truck, 
  Clock, 
  Sprout, 
  Building2,
  MessageCircleQuestion,
  GraduationCap
} from 'lucide-react';

const WhyKriscap = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "50,000+",
      subtitle: "Notes",
      description: "Text & Handwritten"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "200K+",
      subtitle: "members",
      description: ""
    },
    {
      icon: <Youtube className="w-8 h-8 text-red-600" />,
      title: "200M+",
      subtitle: "views",
      description: "YouTube - All channel"
    },
    {
      icon: <Video className="w-8 h-8 text-indigo-600" />,
      title: "Daily Live",
      subtitle: "interactive classes",
      description: "",
      badge: "LIVE"
    },
    {
      icon: <Scale className="w-8 h-8 text-amber-700" />,
      title: "All Exam Counselling",
      subtitle: "",
      description: "Expert & Analysis"
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: "Physical files",
      subtitle: "Home Delivery",
      description: ""
    },
    {
      icon: <Clock className="w-8 h-8 text-gray-700" />,
      title: "24x7",
      subtitle: "Doubt solving Session",
      description: ""
    },
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: "Ecofriendly Mentorship",
      subtitle: "",
      description: "Guide & Support"
    },
    {
      icon: <Building2 className="w-8 h-8 text-emerald-600" />,
      title: "20+",
      subtitle: "Offline centres",
      description: ""
    }
  ];

  return (
    <section className="py-16 bg-[#eef5fc] text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#1a2b4b]">
            Empowering India's <br className="hidden md:block" />
            <span className="text-[#3a7bd5]">Trusted Professional</span> Future
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto font-medium">
            Revolutionize your future with Kriscap Education - The high-tech bridge from skill learning to Professional employment.
          </p>
        </div>

        {/* Conversation Section */}
        <div className="relative mb-16 max-w-3xl mx-auto flex flex-col gap-6">
          {/* Student Message */}
          <div className="flex flex-col md:flex-row-reverse items-end md:items-start gap-4 self-end w-max max-w-[90%] md:max-w-[70%]">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-gray-800 text-sm">Student</span>
              <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                <Users className="w-8 h-8 text-slate-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl rounded-tr-sm md:rounded-tr-3xl md:rounded-br-sm shadow-sm border-[1.5px] border-slate-800 mt-6 relative">
              <p className="text-gray-800 font-medium text-sm md:text-base whitespace-pre-wrap">
                Kriscap sir, what makes K.E. different from others?
              </p>
              {/* Desktop Tail */}
              <div className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[12px] border-l-white border-b-[10px] border-b-transparent z-10" />
              <div className="hidden md:block absolute right-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[11px] border-t-transparent border-l-[13px] border-l-slate-800 border-b-[11px] border-b-transparent" />
            </div>
          </div>

          {/* Kriscap Sir Message */}
          <div className="flex flex-col md:flex-row items-end md:items-start gap-4 self-start w-max max-w-[90%] md:max-w-[80%]">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-gray-800 text-sm">Kriscap Sir</span>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#d4af37] shadow-md flex items-center justify-center overflow-hidden bg-white">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h6tPjB6EaG5rPqZy0L2YvVXHnM4cKJ.png" 
                  alt="Kriscap Sir" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if(target.src !== "https://ui-avatars.com/api/?name=Kriscap+Sir&background=random") {
                       target.src = "https://ui-avatars.com/api/?name=Kriscap+Sir&background=random";
                    }
                  }}
                />
              </div>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-3xl rounded-tl-sm md:rounded-tl-3xl md:rounded-bl-sm shadow-sm border-[1.5px] border-slate-800 mt-8 relative">
              <p className="text-gray-800 text-sm md:text-base leading-relaxed font-medium">
                At K.E., we don't just give degrees; we build careers. We train you to leave behind odd jobs and step into a dignified, professional life. Here, education means employment.
              </p>
              {/* Desktop Tail */}
              <div className="hidden md:block absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[12px] border-r-white border-b-[10px] border-b-transparent z-10" />
              <div className="hidden md:block absolute left-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[11px] border-t-transparent border-r-[13px] border-r-slate-800 border-b-[11px] border-b-transparent" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 bg-white border-t border-l border-gray-800 mx-auto rounded-md overflow-hidden max-w-4xl shadow-md">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="border-b border-r border-gray-800 p-4 md:p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2 w-full justify-center">
                <div className="flex-shrink-0 relative">
                  {feature.icon}
                  {feature.badge && (
                    <span className="absolute -bottom-3 -right-2 bg-red-600 text-white text-[10px] font-bold px-1 rounded">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-extrabold text-base md:text-xl text-gray-900">{feature.title}</span>
                  {feature.subtitle && (
                    <span className="font-semibold text-sm md:text-base text-gray-800">{feature.subtitle}</span>
                  )}
                </div>
              </div>
              {feature.description && (
                <p className="text-xs md:text-sm text-gray-600 font-medium w-full text-center mt-1">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyKriscap;
