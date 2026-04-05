import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4" 
          : "bg-white/90 backdrop-blur-sm py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0b1f3c] flex items-center justify-center text-white font-bold text-xl mb-1 shadow-md">
              <span className="leading-none flex items-center justify-center">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-slate-800 leading-none tracking-tight">
                K.E. Career Institute
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">
                (Registered)
              </span>
            </div>
          </Link>

          {/* Center/Right Section Wrapper */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative text-[14px] font-bold uppercase tracking-wider transition-colors ${
                      location.pathname === link.href ? "text-primary" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.href && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
            )}

            {/* Auth Actions (Desktop) */}
            <div className={`hidden md:flex items-center gap-3 ${isAuthenticated ? "border-l border-slate-200 pl-8" : ""}`}>
              {isAuthenticated ? (
                <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}>
                  <Button className="rounded-full px-6 bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary/90 text-white">
                    {user?.role === "admin" ? "Admin Panel" : "My Dashboard"}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="rounded-full px-6 font-bold text-slate-600 hover:text-primary hover:bg-slate-100">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full px-6 bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary/90 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-4 overflow-hidden shadow-2xl relative z-50 rounded-b-3xl"
          >
            <nav className="flex flex-col px-6 py-6 space-y-2">
              {isAuthenticated && (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`px-4 py-3 rounded-2xl font-bold uppercase tracking-wider text-sm transition-colors ${
                        location.pathname === link.href ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="h-px bg-slate-100 my-4" />
                </>
              )}

              {/* Mobile Auth Actions */}
              {isAuthenticated ? (
                <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="w-full">
                  <Button className="w-full rounded-2xl h-12 bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary/90 text-white" onClick={() => setIsMenuOpen(false)}>
                    {user?.role === "admin" ? "Admin Panel" : "My Dashboard"}
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full rounded-2xl h-12 font-bold border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full rounded-2xl h-12 bg-primary font-bold shadow-md shadow-primary/20 hover:bg-primary/90 text-white" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;