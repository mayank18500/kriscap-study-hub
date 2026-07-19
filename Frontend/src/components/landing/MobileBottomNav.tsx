import { Home, BookOpen, ShoppingCart, GraduationCap, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const MobileBottomNav = ({ activeView, setActiveView }: { activeView?: string, setActiveView?: (view: string) => void }) => {
  const { items, setIsOpen } = useCart();
  const cartItemCount = items?.length || 0;
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "store", icon: BookOpen, label: "Store", path: "/store" },
    { id: "cart", icon: ShoppingCart, label: "Cart", isSpecial: true, path: "" },
    { id: "admission", icon: GraduationCap, label: "Admission", path: "/admission" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" }
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.isSpecial) {
      setIsOpen(true);
      return;
    }
    
    // If we have setActiveView (like in Index.tsx), use it
    if (setActiveView) {
      setActiveView(item.id === "admission" ? "courses" : item.id);
    } else {
      // Otherwise use actual routing
      navigate(item.path);
    }
  };

  const getIsActive = (item: typeof navItems[0]) => {
    if (activeView) {
      return activeView === item.id || (item.id === "admission" && activeView === "courses");
    }
    
    // Fallback to URL matching for pages without activeView (like /tma-files, /profile)
    const currentPath = location.pathname;
    if (item.id === "home") return currentPath === "/";
    if (item.id === "store") return currentPath.startsWith("/store") || currentPath.startsWith("/tma-files") || currentPath.startsWith("/project-files");
    if (item.id === "admission") return currentPath.startsWith("/admission") || currentPath.startsWith("/courses");
    if (item.id === "profile") return currentPath.startsWith("/profile") || currentPath.startsWith("/login") || currentPath.startsWith("/orders");
    
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
      <div className="flex justify-around items-center px-2 py-2 h-16 relative">
        {navItems.map((item) => {
          const isActive = getIsActive(item);

          if (item.isSpecial) {
            return (
              <div key={item.id} className="relative -top-5">
                <button
                  onClick={() => handleNavigation(item)}
                  className="flex flex-col items-center justify-center w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 text-white transform hover:scale-105 active:scale-95 transition-all"
                >
                  <div className="relative">
                    <item.icon className="w-6 h-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-blue-600">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center justify-center w-12 gap-1 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "fill-blue-50/50" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
