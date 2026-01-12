import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
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
    { icon: Mail, text: "support@kriscap.edu", href: "mailto:support@kriscap.edu" },
    { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: MapPin, text: "Delhi, India", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">
                Kriscap Education
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6">
              Your trusted partner for NIOS study materials. Quality content, affordable prices, and excellent support.
            </p>
            
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="success" className="gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Support
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Kriscap Education. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-primary-foreground/50 text-sm">
            <span>Made with ❤️ for NIOS students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
