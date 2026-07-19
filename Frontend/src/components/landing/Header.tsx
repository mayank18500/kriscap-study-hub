import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, ChevronRight, LogOut, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import MobileBottomNav from "@/components/landing/MobileBottomNav";

interface HeaderProps {
  activeView?: string;
  setActiveView?: (view: string) => void;
}

const Header = ({ activeView, setActiveView }: HeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated, logout } = useAuth();
  const { items, setIsOpen } = useCart();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Scroll visibility and styling detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled styling
      setIsScrolled(currentScrollY > 15);

      // Hide/Reveal animation
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 64) {
          // Hide only if drawers are closed
          if (!isMenuOpen && !isSearchOpen) {
            setIsVisible(false);
          }
        } else {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen, isSearchOpen]);

  const publicLinks = [
    { id: "home", label: "Home" },
    { id: "store", label: "Store" },
    { id: "courses", label: "Admission" },
  ];

  const authLinks = [
    { id: "orders", label: "Downloads" },
  ];

  const navLinks = isAuthenticated ? [...publicLinks, ...authLinks] : publicLinks;

  const handleNavClick = (id: string) => {
    if (setActiveView) {
      setActiveView(id);
    } else {
      sessionStorage.setItem("ke_active_view", id);
      navigate("/");
    }
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      sessionStorage.setItem("ke_store_search", searchQuery.trim());
      if (setActiveView) {
        setActiveView("store");
      } else {
        sessionStorage.setItem("ke_active_view", "store");
        navigate("/");
      }
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-14 md:h-16 ${
          isScrolled 
            ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm border-b border-slate-100/50 dark:border-slate-800/50" 
            : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-transparent"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="w-full px-4 md:px-12 max-w-none h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" onClick={() => handleNavClick("home")} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm border border-slate-200/80 flex-shrink-0 bg-white flex items-center justify-center">
              <img src="/krish_logo.jpeg" alt="Kriscap Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[15px] md:text-lg text-slate-800 dark:text-slate-100 leading-none tracking-tight">
                Kriscap Education
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                (Registered)
              </span>
            </div>
          </Link>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-[13px] font-bold uppercase tracking-wider transition-colors ${
                    activeView === link.id ? "text-blue-600" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
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
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6 h-6">
              <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-4 h-4 text-slate-650 dark:text-slate-350" /> : <Moon className="w-4 h-4 text-slate-650 dark:text-slate-350" />}
              </Button>

              {/* Search Trigger */}
              <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-4 h-4 text-slate-650 dark:text-slate-350" />
              </Button>

              {/* Cart Trigger */}
              <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" onClick={() => setIsOpen(true)}>
                <ShoppingCart className="w-4 h-4 text-slate-650 dark:text-slate-350" />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full shadow-md">
                    {items.length}
                  </span>
                )}
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleNavClick("profile")} variant="ghost" className="rounded-full px-3 h-8 font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-350 dark:hover:text-blue-400">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    Profile
                  </Button>
                  <Button onClick={logout} variant="ghost" className="rounded-full px-3 h-8 font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:text-rose-300">
                    Log Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="rounded-full px-4 h-8 font-bold text-slate-650 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:bg-slate-800">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-xl px-4 h-8 bg-primary hover:bg-primary/90 font-bold text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Actions (Mobile only) */}
          <div className="flex md:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-350"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </Button>
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-350"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-[18px] h-[18px]" />
            </Button>

            {/* Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-[18px] h-[18px]" />
            </Button>
          </div>
        </div>

      </header>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-start justify-center p-4 pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-white dark:bg-slate-900 rounded-[24px] p-5 w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Search Store</h3>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455" />
                <input
                  type="text"
                  placeholder="Search products, subjects, classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100"
                  autoFocus
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[380px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-l border-slate-150 dark:border-slate-800 shadow-2xl flex flex-col justify-between rounded-tl-[32px] md:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link to="/" onClick={() => handleNavClick("home")} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/80 flex-shrink-0">
                    <img src="/krish_logo.jpeg" alt="Kriscap Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight">
                    Kriscap Education
                  </span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-900 rounded-full transition-colors"
                >
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-2">Menu</span>
                  <motion.nav 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    className="flex flex-col space-y-0.5"
                  >
                    {navLinks.map((link) => (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, x: 15 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={`w-full px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] transition-all text-left flex items-center justify-between ${
                          activeView === link.id
                            ? "bg-blue-600/5 text-blue-600"
                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-900"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                      </motion.button>
                    ))}
                  </motion.nav>
                </div>

                {/* Academic Categories */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-2">Categories</span>
                  <div className="flex flex-col space-y-0.5">
                    <Link 
                      to="/tma-files" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between"
                    >
                      <span>TMA Solutions (PDF)</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                    </Link>
                    <Link 
                      to="/project-files" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between"
                    >
                      <span>Handwritten Projects</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                    </Link>
                  </div>
                </div>

                {/* Personal Links */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-2">Account & Actions</span>
                  <div className="flex flex-col space-y-0.5">
                    <button
                      onClick={() => handleNavClick("wishlist")}
                      className="w-full px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between"
                    >
                      <span>My Wishlist</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                    </button>
                    <button
                      onClick={() => handleNavClick("profile")}
                      className="w-full px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[11px] text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-between"
                    >
                      <span>Account Settings</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5 bg-slate-50/50 dark:bg-slate-950">
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full h-11 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-450 dark:hover:bg-rose-950/40 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-[11px]">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full h-11 bg-primary text-white rounded-xl font-bold hover:bg-primary/95 text-[11px] shadow-sm">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
                <Link to="/admission" onClick={() => setIsMenuOpen(false)} className="block w-full">
                  <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[11px] shadow-sm">
                    Start Admission
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <MobileBottomNav activeView={activeView} setActiveView={setActiveView} />
    </>
  );
};

export default Header;