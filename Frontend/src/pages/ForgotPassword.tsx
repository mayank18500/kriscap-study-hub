import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, Mail, ShieldQuestion, GraduationCap } from "lucide-react";
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

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const { toast } = useToast();

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        setIsLoading(true);
        try {
            await api.post("/auth/forgot-password", values);
            setIsEmailSent(true);
            toast({
                title: "Protocol Initiated",
                description: "Password recovery instructions have been dispatched.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Request Error",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
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
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-xl">
                            <GraduationCap className="w-6 h-6 text-amber-400" />
                        </div>
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-slate-900 mb-3">
                        {isEmailSent ? "Check Your Inbox" : "Credential Recovery"}
                    </h1>
                    <p className="text-slate-500 italic text-sm px-8">
                        {isEmailSent 
                            ? "Instructions have been sent to your registered address." 
                            : "Provide your official email to receive a password restoration link."}
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10">
                    {isEmailSent ? (
                        <div className="flex flex-col items-center space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                                <Mail className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-slate-500">
                                    We sent a recovery link to:
                                </p>
                                <p className="font-serif font-bold text-slate-900 border-b border-amber-200 inline-block">
                                    {form.getValues("email")}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                                onClick={() => setIsEmailSent(false)}
                            >
                                Use different email
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Official Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <Input 
                                                        placeholder="student@example.com" 
                                                        {...field} 
                                                        className="pl-12 h-14 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 bg-slate-50/50 transition-all"
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 ml-1" />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98]">
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        "Initiate Recovery"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    )}

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Return to Login
                        </Link>
                    </div>
                </div>

                <p className="mt-10 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                    Kriscap Education Academic Portal
                </p>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;