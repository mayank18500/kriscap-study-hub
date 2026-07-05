import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import AnnouncementBar from "./AnnouncementBar";

interface HeaderProps {
  activeView?: string;
  setActiveView?: (view: string) => void;
}

const Header = ({ activeView, setActiveView }: HeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { items, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicLinks = [
    { id: "home", label: "Home" },
    { id: "store", label: "Store" },
    { id: "courses", label: "Courses" },
  ];

  const authLinks = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Downloads" },
  ];

  const navLinks = isAuthenticated ? [...publicLinks, ...authLinks] : publicLinks;

  const handleNavClick = (id: string) => {
    if (setActiveView) {
      setActiveView(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <AnnouncementBar />
      <header 
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4" 
            : "bg-white/90 backdrop-blur-sm py-6"
        }`}
      >
        <div className="w-full px-6 md:px-12 max-w-none">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" onClick={() => handleNavClick("home")} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mb-1 shadow-md border border-slate-200 flex-shrink-0 bg-white">
                <img src="/krish_logo.jpeg" alt="Kriscap Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl text-slate-800 leading-none tracking-tight">
                  Kriscap Education
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">
                  (Registered)
                </span>
              </div>
            </Link>

            {/* Center/Right Section Wrapper */}
            <div className="flex items-center gap-8">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative text-[14px] font-bold uppercase tracking-wider transition-colors ${
                      activeView === link.id ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                    {activeView === link.id && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Cart & Auth Actions (Desktop) */}
              <div className="hidden md:flex items-center gap-3 border-l border-slate-200 pl-6">
                <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-full" onClick={() => setIsOpen(true)}>
                  <ShoppingCart className="w-5 h-5 text-slate-600" />
                  {items.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full shadow-md">
                      {items.length}
                    </span>
                  )}
                </Button>

                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <Button onClick={() => handleNavClick("profile")} variant="ghost" className="rounded-full px-4 font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button onClick={logout} variant="ghost" className="rounded-full px-4 font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="rounded-full px-6 font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-100">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="rounded-2xl px-6 bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-full" onClick={() => setIsOpen(true)}>
                  <ShoppingCart className="w-5 h-5 text-slate-600" />
                  {items.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full shadow-md">
                      {items.length}
                    </span>
                  )}
                </Button>
                <button
                  className="p-2 text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
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
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-4 py-3 rounded-2xl font-bold uppercase tracking-wider text-sm transition-colors text-left ${
                      activeView === link.id ? "bg-blue-600/5 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-4" />

                {/* Mobile Auth Actions */}
                {isAuthenticated ? (
                  <div className="flex flex-col gap-3 pt-2">
                    <Button onClick={() => handleNavClick("profile")} variant="outline" className="w-full rounded-2xl h-12 font-bold border-slate-200 text-slate-700">
                      <User className="w-5 h-5 mr-2" /> My Profile
                    </Button>
                    <Button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full rounded-2xl h-12 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold">
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-2">
                    <Link to="/login" className="w-full">
                      <Button variant="outline" className="w-full rounded-2xl h-12 font-bold border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="w-full">
                      <Button className="w-full rounded-2xl h-12 bg-primary font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 text-white" onClick={() => setIsMenuOpen(false)}>
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
    </>
  );
};

export default Header;