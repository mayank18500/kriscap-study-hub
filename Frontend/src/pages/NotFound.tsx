import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SearchX, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Access denied to non-existent archive:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfcf8] p-6 relative overflow-hidden">
      {/* Background Classical Flourishes */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        {/* Academic Seal Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center shadow-2xl">
              <SearchX className="w-10 h-10 text-amber-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Error Typography */}
        <h1 className="font-serif text-8xl font-bold text-slate-900 opacity-10 mb-[-40px]">404</h1>
        <div className="relative">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Folio Not <span className="italic text-amber-600">Found</span>
          </h2>
          <p className="text-slate-500 text-lg italic leading-relaxed mb-10">
            The record you are seeking at <span className="text-slate-800 font-mono text-sm not-italic bg-slate-100 px-2 py-0.5 rounded">{location.pathname}</span> does not exist in our current archives.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-6">
          <Link to="/">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-14 font-bold shadow-xl transition-all hover:-translate-y-1 group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Campus
            </Button>
          </Link>
          
          <div className="h-[1px] w-24 bg-slate-200" />
          
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Kriscap Education Registry
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;