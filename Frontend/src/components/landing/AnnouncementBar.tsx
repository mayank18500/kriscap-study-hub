import { X, Megaphone } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#0b1f3c] via-[#1e3a5f] to-[#0b1f3c] text-white py-2.5 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-center gap-3 pr-8">
        <Megaphone className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-xs md:text-sm text-center">
          <span className="font-bold text-amber-400">🎉 New batch starting soon!</span>
          {" "}
          <a
            href="https://wa.me/917023057797?text=Hi%2C%20I%20want%20to%20book%20free%20counseling"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-amber-300 transition-colors ml-1"
          >
            Book your free counseling session →
          </a>
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
