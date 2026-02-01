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
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-semibold text-foreground">
            {title}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Cart Trigger */}
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </Button>

          {/* Wishlist */}
          <Link to="/dashboard/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
