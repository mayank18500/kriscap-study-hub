import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileText,
  Package,
  ShoppingBag,
  Download,
  User,
  LogOut,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: FileText, name: "PDFs", href: "/dashboard/tma" },
    { icon: Package, name: "Projects(Home Delivery)", href: "/dashboard/projects" },
    { icon: ShoppingBag, name: "Orders", href: "/dashboard/orders" },
    { icon: Download, name: "Access", href: "/dashboard/downloads" },
    { icon: User, name: "Profile", href: "/dashboard/profile" },
  ];

  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay - Sophisticated Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground z-50 transform transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full relative">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* Header - Classical Branding */}
          <div className="relative flex items-center justify-between p-8 border-b border-slate-800/50">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:border-amber-500/50 transition-all">
                <img src="/krish_logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-white leading-none">
                  Kriscap
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mt-1">
                  Education
                </span>
              </div>
            </Link>
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-slate-800 text-slate-400 transition-colors" 
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation - The Scholastic List */}
          <nav className="relative flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
            <div className="px-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Main Registry
              </span>
            </div>
            
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all duration-200",
                    active
                      ? "bg-amber-500/10 text-amber-400 shadow-sm"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      active ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300"
                    )} />
                    <span className="text-sm tracking-wide">{item.name}</span>
                  </div>
                  {active && (
                    <motion.div layoutId="activeNav" className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-amber-500" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer - Student Identity Card */}
          <div className="relative p-6 mt-auto border-t border-slate-800/50 bg-slate-900/50">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Verified Session
                 </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                 <ShieldCheck className="w-3 h-3 text-amber-500/50" />
                 <span>Official Student ID: KR-2026</span>
              </div>
            </div>

            <Link to="/">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all group"
              >
                <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-xs">Log Out</span>
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;