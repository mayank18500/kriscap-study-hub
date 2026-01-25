import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "TMA Files", href: "/tma-files" },
    { name: "Project Files", href: "/project-files" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/about" },
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
    <footer id="contact" className="relative bg-[#0f172a] text-slate-200 pt-16 pb-8 overflow-hidden">
      {/* Decorative Classical Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:border-amber-500/50 transition-all">
                <GraduationCap className="w-6 h-6 text-amber-500" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Kriscap <span className="text-amber-500">Education</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Empowering NIOS students nationwide with premium study materials, expert-curated TMA files, and dedicated academic support.
            </p>
            <div className="pt-2">
               <a href="https://wa.me/917023057797" target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Support Chat
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-amber-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Governance</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Get In Touch</h4>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="flex items-start gap-4 group">
                      <div className="mt-1 p-2 rounded-lg bg-slate-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-slate-400 group-hover:text-slate-200 transition-colors text-sm break-all">
                        {item.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs tracking-wide">
            © {new Date().getFullYear()} KRISCAP EDUCATION PVT LTD.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 text-xs italic">
              <span>Excellence in NIOS Distance Learning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;