import { useState, useEffect } from "react";
import { Tag, Sparkles, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const OFFERS = [
  {
    id: 1,
    icon: <Tag className="w-5 h-5 text-blue-600 fill-blue-100" />,
    mobileIcon: <Tag className="w-4 h-4 text-blue-600 fill-blue-100 mr-2 md:hidden" />,
    title: "Exclusive Offer for You!",
    description: "Get ₹30 Off on all standard orders of ₹199 or more. Valid verified NIOS documents.",
    linkText: "[Explore Content]",
    linkTo: "/courses",
    badgeColors: "bg-blue-50 border-blue-100"
  },
  {
    id: 2,
    icon: <Sparkles className="w-5 h-5 text-amber-600 fill-amber-100" />,
    mobileIcon: <Sparkles className="w-4 h-4 text-amber-600 fill-amber-100 mr-2 md:hidden" />,
    title: "New Batch Starting!",
    description: "Join our daily live interactive classes and secure your professional future.",
    linkText: "[Enroll Now]",
    linkTo: "/admission",
    badgeColors: "bg-amber-50 border-amber-100"
  },
  {
    id: 3,
    icon: <Gift className="w-5 h-5 text-emerald-600 fill-emerald-100" />,
    mobileIcon: <Gift className="w-4 h-4 text-emerald-600 fill-emerald-100 mr-2 md:hidden" />,
    title: "Special Mentorship",
    description: "Get 1-on-1 ecofriendly mentorship from our expert instructors.",
    linkText: "[Learn More]",
    linkTo: "/about",
    badgeColors: "bg-emerald-50 border-emerald-100"
  }
];

const OfferBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-6 bg-gray-50 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative min-h-[140px] md:min-h-[80px] w-full max-w-5xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full"
            >
              <div className="bg-white rounded-2xl md:rounded-full py-4 px-4 md:px-8 shadow-sm border border-blue-100 flex flex-col md:flex-row items-center gap-4 justify-center text-center md:text-left mx-auto">
                <div className={`p-2.5 rounded-2xl hidden md:block border ${OFFERS[currentIndex].badgeColors}`}>
                  {OFFERS[currentIndex].icon}
                </div>
                <p className="text-slate-800 text-[15px] font-medium leading-relaxed">
                  <span className="font-bold flex items-center justify-center md:inline-flex md:mr-2 text-slate-900">
                     {OFFERS[currentIndex].mobileIcon}
                     {OFFERS[currentIndex].title}
                  </span>
                  {OFFERS[currentIndex].description} 
                  <Link to={OFFERS[currentIndex].linkTo} className="text-primary font-bold ml-2 hover:underline transition-all">
                    {OFFERS[currentIndex].linkText}
                  </Link>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
