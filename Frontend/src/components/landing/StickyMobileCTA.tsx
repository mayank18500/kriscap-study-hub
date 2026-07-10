import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-dark bg-slate-900/95 border-t border-slate-800 p-3 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-3">
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-colors shadow-lg shadow-[#25D366]/20"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
        <Link
          to="/store"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
        >
          Book Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
