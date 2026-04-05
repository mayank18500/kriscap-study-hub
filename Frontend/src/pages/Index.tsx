import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import UpcomingClasses from "@/components/landing/UpcomingClasses";
import OfferBanner from "@/components/landing/OfferBanner";
import TargetToday from "@/components/landing/TargetToday";
import Footer from "@/components/landing/Footer";
import WhyKriscap from "@/components/landing/WhyKriscap";
import CareerPath from "@/components/landing/CareerPath";
import CareerTransformation from "@/components/landing/CareerTransformation";
import CallGuidance from "@/components/landing/CallGuidance";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <UpcomingClasses />
        <OfferBanner />
        <TargetToday />
        <WhyKriscap />
        <CareerPath />
        <CareerTransformation />
        <CallGuidance />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
