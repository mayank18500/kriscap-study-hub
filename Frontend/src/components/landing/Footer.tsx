import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Instagram, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "TMA Files", href: "/tma-files" },
    { name: "Project Files", href: "/project-files" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  const supportLinks = [
    { name: "Track Order", href: "/orders" },
    { name: "Downloads", href: "/orders" },
    { name: "Student Dashboard", href: "/dashboard" },
    { name: "FAQ", href: "/#faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const contactInfo = [
    { icon: Mail, text: "kriscapeducation@gmail.com", href: "mailto:kriscapeducation@gmail.com" },
    { icon: Phone, text: "+91 70230 57797", href: "tel:+917023057797" },
    { icon: MapPin, text: "New Delhi, India", href: "#" },
  ];

  return (
    <footer className="relative bg-[#0b1f3c] text-slate-300 pt-10 md:pt-20 pb-24 md:pb-8 overflow-hidden border-t border-white/10">
      <div className="w-full px-6 md:px-12 max-w-none">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-6 gap-x-6 lg:gap-8 mb-8 md:mb-16">

          {/* Column 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden mb-1 shadow-md border border-white/10 flex-shrink-0 bg-white">
                <img src="/krish_logo.jpeg" alt="Kriscap Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">
                  Kriscap Education
                </span>
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mt-0.5">
                  (Registered)
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 pr-4">
              Empowering NIOS students nationwide with premium study materials, expert-curated TMA files, and dedicated academic support.
            </p>

            <div className="space-y-3 pt-2">
              <a href="tel:+917023057797" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 70230 57797</span>
              </a>
              <a href="mailto:support@kriscap.com" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@kriscap.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Kriscap Education ,Mandadam ,<br />
                  Amaravathi, Andhra Pradesh - 530011
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-3 md:mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:space-y-3 md:gap-0">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors flex items-center group relative">
                    <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute left-0" />
                    <span className="transform transition-transform duration-300 group-hover:translate-x-5">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-3 md:mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:space-y-3 md:gap-0">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors flex items-center group relative">
                    <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute left-0" />
                    <span className="transform transition-transform duration-300 group-hover:translate-x-5">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social (4 cols) */}
          <div className="lg:col-span-3 lg:col-start-10 space-y-4 md:space-y-6">
            <div>
              <h4 className="text-white font-bold mb-3 md:mb-6 uppercase tracking-widest text-sm">Join Our Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4">
                Get the latest NIOS updates and exam tips directly in your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm w-full text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Follow Us</h4>
              <div className="flex gap-3">
                <a href="https://youtube.com/@kriscapeducation?si=NlN3mUMGulpVxYPg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/kriscapeducation" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61573232708616" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Kriscap Education Pvt Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-xs md:text-sm text-slate-500">
            {legalLinks.map((link) => (
              <Link key={link.name} to={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;