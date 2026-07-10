import { useState, useEffect, lazy, Suspense } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Loader2 } from "lucide-react";

// Layout & Global Components
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import MobileBottomNav from "@/components/landing/MobileBottomNav";

// Home View Sections (Public Landing)
import OfferBanner from "@/components/landing/OfferBanner";
import StudentConvo from "@/components/landing/StudentConvo";
import UpcomingClasses from "@/components/landing/UpcomingClasses";
import SuccessStories from "@/components/landing/SuccessStories";
import WhyKriscap from "@/components/landing/WhyKriscap";
import StatsBar from "@/components/landing/StatsBar";
import NIOSRoadmap from "@/components/landing/NIOSRoadmap";
import FreeResources from "@/components/landing/FreeResources";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import CommunityHub from "@/components/landing/CommunityHub";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";

// Lazy loaded Dashboard/Account Subviews
const Profile = lazy(() => import("./Profile"));
const OrdersDownloads = lazy(() => import("./OrdersDownloads"));
const Admission = lazy(() => import("./Admission"));
const Store = lazy(() => import("./Store"));
const Dashboard = lazy(() => import("./Dashboard"));
const Wishlist = lazy(() => import("./Wishlist"));

// SEO CONFIGURATION MAP
const SEO_CONTENT = {
  home: {
    title: "Kriscap Education | Premium NIOS TMA Solutions & Academic Resources",
    description: "Get professionally prepared NIOS TMA solutions, academic project files, and expert guidance at Kriscap Education. Boost your NIOS results today."
  },
  dashboard: { title: "Student Dashboard | Kriscap", description: "Access your personalized dashboard, courses, and account settings." },
  profile: { title: "My Profile | Kriscap", description: "View and edit your student profile details." },
  wishlist: { title: "Saved Resources | Kriscap", description: "Your bookmarked TMAs and study materials." },
  orders: { title: "Orders & Downloads | Kriscap", description: "Access your digital purchases and TMAs." },
  store: { title: "NIOS Digital Store | Kriscap", description: "Explore and buy premium educational resources." },
  courses: { title: "Upcoming NIOS Classes | Admissions", description: "Enroll in live online classes for academic excellence." },
};

// --- HELPER COMPONENT: Reusable Authenticated Layout ---
const ProtectedViewLayout = ({ children }) => (
  // Standard container spacing for dashboard pages
  <div className="pt-10 pb-24 min-h-screen container mx-auto px-4 md:px-6">
    <SignedIn>{children}</SignedIn>
    <SignedOut><RedirectToSignIn /></SignedOut>
  </div>
);

const Index = () => {
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    const pendingSearch = sessionStorage.getItem("ke_store_search");
    if (pendingSearch) {
      setActiveView("store");
      sessionStorage.removeItem("ke_store_search"); // Clean up after reading
      return;
    }

    const pendingView = sessionStorage.getItem("ke_active_view");
    if (pendingView) {
      setActiveView(pendingView);
      sessionStorage.removeItem("ke_active_view");
    }
  }, []);

  // Determine current SEO based on active view
  const currentSEO = SEO_CONTENT[activeView] || SEO_CONTENT.home;

  const renderContent = () => {
    switch (activeView) {
      // Protected (Authenticated) Dashboard Views
      case "dashboard": return <ProtectedViewLayout><Dashboard /></ProtectedViewLayout>;
      case "profile": return <ProtectedViewLayout><Profile /></ProtectedViewLayout>;
      case "wishlist": return <ProtectedViewLayout><Wishlist /></ProtectedViewLayout>;
      case "orders": return <ProtectedViewLayout><OrdersDownloads /></ProtectedViewLayout>;
      case "courses": return <ProtectedViewLayout><Admission hideHeaderFooter={true} /></ProtectedViewLayout>;

      // Public Account/Store Views
      case "store":
        return (
          <div className="pt-10 pb-24 min-h-screen container mx-auto px-4 md:px-6">
            <Store />
          </div>
        );

      // Main Landing Page View
      case "home":
      default:
        return (
          <>
            {/* Semantic main tag for better SEO */}
            <main>
              <OfferBanner onViewStore={() => setActiveView("store")} />
              <StudentConvo />
              <UpcomingClasses />
              <SuccessStories />
              <WhyKriscap />
              <StatsBar />
              <NIOSRoadmap />
              <FreeResources />
              <FeaturedProducts onViewStore={() => setActiveView("store")} />
              <CommunityHub />
              <FAQSection />
              <FinalCTA />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <HelmetProvider>
      {/* Page Structure: Improved default colors (slate) and anti-aliasing */}
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col pt-16 selection:bg-blue-100">

        {/* DYNAMIC SEO INJECTION */}
        <Helmet>
          <title>{currentSEO.title}</title>
          <meta name="description" content={currentSEO.description} />
          <meta property="og:title" content={currentSEO.title} />
          <meta property="og:description" content={currentSEO.description} />
          {/* Define primary brand color for browser address bars */}
          <meta name="theme-color" content="#0b1f3c" />
          <link rel="canonical" href={window.location.origin} />
        </Helmet>

        <Header activeView={activeView} setActiveView={setActiveView} />

        {/* Set max width to prevent awkward stretching on wide screens */}
        <div className="flex-grow w-full max-w-[1920px] mx-auto">

          {/* Enhanced Suspense Loading Fallback */}
          <Suspense fallback={
            <div className="min-h-[75vh] flex flex-col items-center justify-center gap-5 glass m-6 rounded-[2rem]">
              <div className="relative flex items-center justify-center">
                {/* Visual pulse glow behind the spinner */}
                <div className="absolute inset-0 rounded-full blur-2xl bg-indigo-500/30 animate-pulse"></div>
                <Loader2 className="h-14 w-14 animate-spin text-indigo-600 relative z-10" />
              </div>
              <p className="text-slate-600 font-medium animate-pulse text-lg tracking-tight">Loading experience...</p>
            </div>
          }>
            <AnimatePresence mode="wait">
              {/* Premium Page Transition */}
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like bezier
                className="w-full h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>

        <FloatingWhatsApp />
        <MobileBottomNav activeView={activeView} setActiveView={setActiveView} />
      </div>
    </HelmetProvider>
  );
};

export default Index;