import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onMenuClick: () => void;
  title: string;
}

const AdminHeader = ({ onMenuClick, title }: AdminHeaderProps) => {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
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

        <div>
          <Button onClick={logout} variant="outline" className="font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
