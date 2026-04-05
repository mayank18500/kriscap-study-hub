import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, Sparkles } from "lucide-react";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API submission
    setTimeout(() => {
      toast({
        title: "Message Transmitted",
        description: "Our support agents will respond to your registered email shortly.",
      });
      setIsLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Geometric Spacer */}
      <div className="pt-32 pb-4 bg-primary text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Contact Administration</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto px-4">
          Need assistance with your NIOS portal or an existing order? Reach out to our dedicated support team directly.
        </p>
      </div>

      <section className="flex-1 max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-12 lg:gap-20">
        
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Direct Support</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Our priority support line is available Monday through Saturday. Drop us a message for immediate assistance.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, title: "Support Hotline", val: "+91 800 555 0199" },
                { icon: Mail, title: "Official Email", val: "support@kecareerinstitute.com" },
                { icon: MapPin, title: "Headquarters", val: "New Delhi, India" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 text-slate-500 uppercase tracking-widest text-xs font-bold">
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-slate-900 font-medium text-lg ml-7">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20"
        >
          <div className="mb-8">
             <h2 className="text-3xl font-bold text-slate-900">Send an Inquiry</h2>
             <p className="text-slate-500 mt-2">Fill out the secure form below to open a ticket.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</Label>
                <Input id="firstName" required className="h-14 rounded-2xl bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</Label>
                <Input id="lastName" required className="h-14 rounded-2xl bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Official Email</Label>
              <Input id="email" type="email" required className="h-14 rounded-2xl bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="student@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Subject Matter</Label>
              <Input id="subject" required className="h-14 rounded-2xl bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="TMA Delivery Status" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Secure Message</Label>
              <Textarea 
                id="message" 
                required 
                className="min-h-[150px] rounded-2xl bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-primary/20 p-4" 
                placeholder="Explain the details of your inquiry..." 
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  Transmit Message
                  <Send className="w-4 h-4 ml-1" />
                </div>
              )}
            </Button>
          </form>
        </motion.div>

      </section>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 text-center mt-auto">
        <p className="text-slate-500 font-medium text-sm">
          &copy; {new Date().getFullYear()} K.E. Career Institute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Contact;
