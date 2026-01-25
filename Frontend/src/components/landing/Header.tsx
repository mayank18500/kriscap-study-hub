import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for a more "dynamic" classical feel
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "TMA Files", href: "/tma-files" },
    { name: "Project Files", href: "/project-files" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Classical Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <img src="./krish_logo.jpeg" alt="Kriscap Logo" className="w-7 h-7 rounded-full" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-slate-900">
              Kriscap <span className="text-amber-600">Education</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
              >
                {link.name}
                {/* Underline animation */}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-1/2 group-hover:left-4" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - Elegant Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-full px-6">
                Login
              </Button>
            </Link>
            <Link to="/dashboard/tma">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Classical Drawer style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 md:hidden bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-6 mt-4 border-t border-slate-100">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full border-slate-200">Login</Button>
                </Link>
                <Link to="/dashboard/tma" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full rounded-full bg-slate-900">Dashboard</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;