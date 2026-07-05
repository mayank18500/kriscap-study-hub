import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
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
                    className="w-full max-w-md flex flex-col items-center justify-center"
                >
                    <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/dashboard/tma" />
                    
                    <p className="mt-8 text-center text-xs text-slate-400 font-medium">
                        By enrolling, you agree to our <Link to="/terms" className="underline">Terms of Service</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;