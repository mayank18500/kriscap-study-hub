import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Dynamic Sidebar - Hidden on Mobile */}
      <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-12 overflow-hidden">
        {/* Soft student background overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('/img/hero-student.png')` }}
        />
        
        <div className="relative z-10 max-w-lg text-center">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white font-bold text-3xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
              S
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Unlock Your NIOS <span className="text-blue-400">Success</span>
          </h2>
          <p className="text-blue-100/80 text-lg leading-relaxed mb-12">
            Log in to access your curated NIOS materials, track your project deliveries, and manage your academic portfolio.
          </p>
          
          <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 mt-auto">
            <div className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" />
              Verified Student Portal
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="font-bold text-slate-900 border-l border-slate-300 pl-3">Kriscap Education</span>
            </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md flex flex-col items-center justify-center"
        >
          <SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/dashboard/tma" />
          
          <p className="mt-10 text-center text-xs text-slate-400 font-medium">
            Protected by Kriscap Education Security Protocol &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;