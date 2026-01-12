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
  GraduationCap,
  X,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { icon: Upload, name: "Upload Files", href: "/admin/upload" },
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
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
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
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg">Admin</span>
                <span className="block text-xs text-sidebar-foreground/60">Kriscap</span>
              </div>
            </Link>
            <button className="lg:hidden text-sidebar-foreground" onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Link to="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
