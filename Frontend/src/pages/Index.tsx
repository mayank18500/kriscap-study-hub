import Header from "@/components/landing/Header";
// import Hero from "@/components/landing/Hero";
// import Categories from "@/components/landing/Categories";
// import HowItWorks from "@/components/landing/HowItWorks";
// import WhyUs from "@/components/landing/WhyUs";
import TargetToday from "@/components/landing/TargetToday";
import UpcomingClasses from "@/components/landing/UpcomingClasses";
import SuccessStories from "@/components/landing/SuccessStories";
import CommentsSection from "@/components/landing/CommentsSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsapp";
import OfferBanner from "@/components/landing/OfferBanner";
import StudentConvo from "@/components/landing/StudentConvo";
import WhyKriscap from "@/components/landing/WhyKriscap";
import CommunityHub from "@/components/landing/CommunityHub";
import FAQSection from "@/components/landing/FAQSection";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Loader2, Target } from "lucide-react";
import { useLocation } from "react-router-dom";

const SEO = {
  home: { title: "Kriscap Education | Premium NIOS TMA Solutions & Courses", desc: "Get professionally prepared NIOS TMA solutions, expert guidance, and enroll in our premium online classes to excel in your exams." },
  profile: { title: "Profile | Kriscap", desc: "View and edit your profile." },
  orders: { title: "Orders | Kriscap", desc: "Access your purchases." },
  store: { title: "Store | Kriscap", desc: "Explore high-quality educational resources, NIOS materials, and TMA files." },
  courses: { title: "Classes & Admissions | Kriscap", desc: "Enroll in live online classes tailored for NIOS students." },
};

const Index = () => {
  const location = useLocation();
  const [view, setView] = useState(() => location.pathname === "/store" ? "store" : "home");

  useEffect(() => {
    if (location.pathname === "/store") {
      setView("store");
    } else if (location.pathname === "/") {
      const nextView = sessionStorage.getItem("ke_store_search") ? "store" : sessionStorage.getItem("ke_active_view");
      if (nextView) setView(nextView);
      ["ke_store_search", "ke_active_view"].forEach(k => sessionStorage.removeItem(k));
    }
  }, [location.pathname]);

  // Extract correct SEO metadata based on the current view
  const { title, desc } = SEO[view] || SEO.home;

  // Define the renderView function to handle component swapping
  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <>
            <main>
              <OfferBanner onViewStore={() => setView("store")} />
              <StudentConvo />
              <div className="w-full max-w-7xl mx-auto flex flex-col gap-1 md:gap-2 py-0 md:py-1 px-0 sm:px-2">
              <TargetToday />
              <UpcomingClasses />
              <SuccessStories />
              <WhyKriscap />
              <CommunityHub />
              <FAQSection />
              <CommentsSection />
              </div>
            </main>
            <Footer />
          </>
        );
      // Add other cases here when you create them (e.g., case "store": return <Store />;)
      default:
        return null;
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased flex flex-col pt-16">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta name="theme-color" content="#0b1f3c" />
          <link rel="canonical" href={window.location?.origin} />
        </Helmet>

        <Header />

        <div className="flex-grow w-full max-w-[1920px] mx-auto">
          <Suspense fallback={
            <div className="min-h-[75vh] flex flex-col items-center justify-center gap-5 glass dark:glass-dark m-6 rounded-3xl">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
              <p className="text-slate-600 font-medium animate-pulse">Loading...</p>
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export default Index;