import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, CheckCircle2, Lock, ShieldAlert, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { motion } from "framer-motion";

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "Security key must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Security keys do not match",
        path: ["confirmPassword"],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        if (!resetToken) {
            toast({
                variant: "destructive",
                title: "Invalid Token",
                description: "This restoration link has expired or is malformed.",
            });
            return;
        }

        setIsLoading(true);
        try {
            await api.put(`/auth/reset-password/${resetToken}`, {
                password: values.password,
            });
            setIsSuccess(true);
            toast({
                title: "Restoration Successful",
                description: "Your academic credentials have been secured.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Restoration Error",
                description: error.response?.data?.message || "Protocol failed. Link may be expired.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfcf8] p-6 relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-slate-200/40 rounded-full blur-3xl" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Brand Seal */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-xl">
                            <GraduationCap className="w-6 h-6 text-amber-400" />
                        </div>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-slate-900 mb-3">
                        {isSuccess ? "Access Restored" : "Secure Account"}
                    </h1>
                    <p className="text-slate-500 italic text-sm px-8 leading-relaxed">
                        {isSuccess 
                            ? "Your security parameters have been successfully updated." 
                            : "Define a new security key to regain access to your academic portal."}
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
                    {isSuccess ? (
                        <div className="flex flex-col items-center space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner">
                                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-serif text-xl font-bold text-slate-900">Success</h3>
                                <p className="text-sm text-slate-500 italic">
                                    Account restoration complete.
                                </p>
                            </div>
                            <Button
                                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-900/10 transition-all"
                                onClick={() => navigate("/login")}
                            >
                                Enter Portal
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">New Security Key</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <Input 
                                                        type="password"
                                                        placeholder="••••••••" 
                                                        {...field} 
                                                        className="pl-12 h-14 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 bg-slate-50/50 transition-all"
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs text-rose-500 ml-1" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Confirm Security Key</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <Input 
                                                        type="password"
                                                        placeholder="••••••••" 
                                                        {...field} 
                                                        className="pl-12 h-14 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 bg-slate-50/50 transition-all"
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs text-rose-500 ml-1" />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98]">
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Authorize New Key"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    )}

                    {!isSuccess && (
                        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Return to Credentials
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer Notice */}
                <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 opacity-60">
                    <ShieldAlert className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Secured Restoration Protocol
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;