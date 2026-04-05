import { Menu, Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title: string;
}

const DashboardHeader = ({ onMenuClick, title }: DashboardHeaderProps) => {
  const { logout } = useAuth();
  const { items, setIsOpen } = useCart();

  const navigate = useNavigate();


  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger */}
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-full" onClick={() => setIsOpen(true)}>
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full shadow-md">
                {items.length}
              </span>
            )}
          </Button>

          {/* Wishlist */}
          <Link to="/dashboard/wishlist">
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-full">
              <Heart className="w-5 h-5 text-slate-600" />
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 ml-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl border-slate-100 p-2">
              <DropdownMenuItem asChild className="rounded-xl focus:bg-slate-50 cursor-pointer mb-1">
                <Link to="/dashboard/profile" className="font-medium text-slate-700">Profile Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl focus:bg-slate-50 cursor-pointer font-medium text-slate-700">Settings</DropdownMenuItem>
              <div className="h-px bg-slate-100 my-1 mx-2" />
              <DropdownMenuItem className="text-rose-600 rounded-xl focus:bg-rose-50 cursor-pointer font-bold" onClick={handleLogout}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
