import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login({ email, password });
      toast({ title: "Welcome back", description: "Successfully authenticated." });
      navigate(user.role === "admin" ? "/admin" : "/dashboard/tma");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                <span className="font-bold text-slate-900 border-l border-slate-300 pl-3">K.E. Career Institute</span>
            </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10 mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Member Login</h1>
            <p className="text-slate-500">Enter your credentials to continue your journey.</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Official Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 transition-all font-medium"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500">Security Key</Label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Recover Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 transition-all font-medium"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Authorize Access
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                New to the academy?{" "}
                <Link to="/register" className="text-blue-600 font-bold hover:underline">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
          
          <p className="mt-10 text-center text-xs text-slate-400 font-medium">
            Protected by K.E. Security Protocol &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;