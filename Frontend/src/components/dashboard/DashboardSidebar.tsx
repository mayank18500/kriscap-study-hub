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
          "fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground z-50 transform transition-transform duration-300 lg:translate-x-0 border-r border-border",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full relative">

          {/* Header - K.E. Branding */}
          <div className="relative flex items-center justify-between p-8 border-b border-border/50">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-none">
                  K.E. Career
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
                  Institute
                </span>
              </div>
            </Link>
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors" 
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
                    "group flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all duration-200",
                    active
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      active ? "text-white" : "text-slate-400 group-hover:text-primary"
                    )} />
                    <span className="text-sm tracking-wide">{item.name}</span>
                  </div>
                  {active && (
                    <motion.div layoutId="activeNav" className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer - Student Identity Card */}
          <div className="relative p-6 mt-auto border-t border-border/50 bg-slate-50/50">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Verified Session
                 </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                 <ShieldCheck className="w-4 h-4 text-primary" />
                 <span>Student ID: KE-{new Date().getFullYear()}</span>
              </div>
            </div>

            <Link to="/">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-2xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all group h-12"
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