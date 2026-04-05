import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register({ name, email, password });
            toast({
                title: "Registration Successful",
                description: "Your academic journey with K.E. begins now.",
            });
            navigate("/dashboard/tma");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error.response?.data?.message || "Please check your details and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Sidebar: Dynamic Academic Branding */}
            <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-16 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
                  style={{ backgroundImage: `url('/img/hero-student.png')` }}
                />
                
                <div className="relative z-10 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <Link to="/" className="inline-flex flex-col items-center gap-2 group mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white font-bold text-3xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
                              S
                            </div>
                        </Link>
                        <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                            Begin Your <span className="text-blue-400">Academic</span> Excellence.
                        </h2>
                        <p className="text-blue-100/80 text-lg leading-relaxed">
                            Join over 10,000 students who have streamlined their NIOS education with our verified materials.
                        </p>
                    </motion.div>

                    <ul className="space-y-6">
                        {["Instant Digital Fulfillment", "Expert-Verified Content", "Priority Student Support"].map((text, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="flex items-center gap-4 text-white/90"
                            >
                                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                <span className="font-medium tracking-wide">{text}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                {/* Mobile Logo */}
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
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                        <p className="text-slate-500">Enroll in the K.E. Career Institute portal today.</p>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="name"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 transition-all font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Official Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 transition-all font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Security Key</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 transition-all font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        Enroll Now
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                            <p className="text-sm text-slate-500">
                                Already a member of the academy?{" "}
                                <Link to="/login" className="text-blue-600 font-bold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                    
                    <p className="mt-8 text-center text-xs text-slate-400 font-medium">
                        By enrolling, you agree to our <Link to="/terms" className="underline">Terms of Service</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;