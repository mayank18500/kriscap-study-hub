import { Home, BookOpen, ShoppingCart, GraduationCap, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const MobileBottomNav = ({ activeView, setActiveView }: { activeView: string, setActiveView: (view: string) => void }) => {
  const { items } = useCart();
  const cartItemCount = items?.length || 0;

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "store", icon: BookOpen, label: "Store" },
    { id: "cart", icon: ShoppingCart, label: "Cart", isSpecial: true },
    { id: "admission", icon: GraduationCap, label: "Admission" },
    { id: "profile", icon: User, label: "Profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center px-2 py-2 h-16 relative">
        {navItems.map((item) => {
          const isActive = activeView === item.id || (item.id === "admission" && activeView === "courses"); // Mapping if needed

          if (item.isSpecial) {
            return (
              <div key={item.id} className="relative -top-5">
                <button
                  onClick={() => {
                    // Assuming there is a cart view or trigger cart drawer
                    // If no cart view, we might just open a drawer. For now, activeView="store" or open drawer.
                    setActiveView("store"); // Or another logic to open cart
                  }}
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
              onClick={() => setActiveView(item.id === "admission" ? "courses" : item.id)} // Mapping admission to courses view if it exists, otherwise use what matches.
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
