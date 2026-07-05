import { useState, lazy, Suspense } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Header from "@/components/landing/Header";
import StatsBar from "@/components/landing/StatsBar";
import SuccessStories from "@/components/landing/SuccessStories";
import NIOSRoadmap from "@/components/landing/NIOSRoadmap";
import FreeResources from "@/components/landing/FreeResources";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import CommunityHub from "@/components/landing/CommunityHub";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import UpcomingClasses from "@/components/landing/UpcomingClasses";
import WhyKriscap from "@/components/landing/WhyKriscap";
import StudentConvo from "@/components/landing/StudentConvo";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import OfferBanner from "@/components/landing/OfferBanner";
import { Loader2 } from "lucide-react";

// Lazy loaded subviews
const Profile = lazy(() => import("./Profile"));
const OrdersDownloads = lazy(() => import("./OrdersDownloads"));
const CoursesAdmission = lazy(() => import("./CoursesAdmission"));
const Store = lazy(() => import("./Store"));
const Dashboard = lazy(() => import("./Dashboard"));

const Index = () => {
  const [activeView, setActiveView] = useState("home");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="pt-6 pb-20 min-h-screen">
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>
        );
      case "profile":
        return (
          <div className="pt-6 pb-20 min-h-screen">
            <SignedIn>
              <Profile />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>
        );
      case "orders":
        return (
          <div className="pt-6 pb-20 min-h-screen">
            <SignedIn>
              <OrdersDownloads />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>
        );
      case "store":
        return (
          <div className="pt-6 pb-20 min-h-screen">
            <Store />
          </div>
        );
      case "courses":
        return (
          <div className="pt-6 pb-20 min-h-screen">
            <SignedIn>
              <CoursesAdmission />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>
        );
      case "home":
      default:
        return (
          <>
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-grow">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#0b1f3c]" />
          </div>
        }>
          {renderContent()}
        </Suspense>
      </div>
      
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
