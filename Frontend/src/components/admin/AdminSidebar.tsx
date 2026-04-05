import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Upload,
  CreditCard,
  LogOut,
  X,
  Settings,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, name: "Overview", href: "/admin" },
    { icon: Package, name: "Products", href: "/admin/products" },
    { icon: ShoppingBag, name: "Orders", href: "/admin/orders" },
    { icon: Users, name: "Users", href: "/admin/users" },
    { icon: Upload, name: "Upload Files", href: "/admin/uploads" },
    { icon: MessageSquare, name: "Comments", href: "/admin/comments" },
    { icon: CreditCard, name: "Payments", href: "/admin/payments" },
    { icon: Settings, name: "Settings", href: "/admin/settings" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 lg:translate-x-0 border-r border-border",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">

          {/* Header - K.E. Admin Branding */}
          <div className="flex items-center justify-between p-8 border-b border-border/50">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-none">
                  K.E. Admin
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
                  Institute
                </span>
              </div>
            </Link>
            <button className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors" onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
            <div className="px-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                System Registry
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
                    <motion.div layoutId="activeNavAdmin" className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 mt-auto border-t border-border/50 bg-slate-50/50">
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

export default AdminSidebar;
