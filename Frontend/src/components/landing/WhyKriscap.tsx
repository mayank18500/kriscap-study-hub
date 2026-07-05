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
      <div className="w-full px-6 md:px-12 max-w-none">
        
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
