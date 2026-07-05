import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, GraduationCap, Send, Loader2, Contact } from "lucide-react";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Admission = ({ hideHeaderFooter = false }: { hideHeaderFooter?: boolean }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API enrollment logic
    setTimeout(() => {
      toast({
        title: "Application Received",
        description: "Your admission request has been logged. An academic counselor will contact you shortly.",
      });
      setIsLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const timelineSteps = [
    {
      title: "Submit Request",
      desc: "Fill the secure enrollment inquiry form with your preferred curriculum.",
      icon: Contact
    },
    {
      title: "Document Verification",
      desc: "Our counselors will guide you through standard age & address proofs required by NIOS.",
      icon: FileText
    },
    {
      title: "Successful Enrollment",
      desc: "Receive your enrollment ID and instant portal access.",
      icon: CheckCircle
    }
  ];

  return (
    <div className={`flex flex-col ${!hideHeaderFooter ? "min-h-screen bg-gray-50" : "bg-white"}`}>
      {!hideHeaderFooter && <Header />}
      
      {/* Structural Hero Section */}
      <section className={`relative overflow-hidden bg-primary px-4 lg:px-8 ${hideHeaderFooter ? "py-12" : "pt-32 pb-20"}`}>
        <div className="absolute inset-0 bg-[url('/img/hero-student.png')] bg-cover bg-center opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
        <div className="w-full px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 font-medium text-sm backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Open Admissions Pipeline
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Your Academic <span className="text-blue-400">Future</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
              Join K.E. Career Institute for guaranteed admission protocols, stress-free documentation, and immediate verified coursework access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visual Timeline element */}
      <section className="py-16 -mt-10 px-6 md:px-12 w-full relative z-20">
         <div className="grid md:grid-cols-3 gap-6">
            {timelineSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/20 text-center relative overflow-hidden group"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100">
                    <step.icon className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                 
                 <div className="absolute -right-4 -bottom-4 text-[100px] font-black text-slate-50/50 pointer-events-none select-none z-0">
                    {idx + 1}
                 </div>
              </motion.div>
            ))}
         </div>
      </section>


      {/* Enrollment Form */}
      <section className="py-16 px-6 relative flex flex-1 w-full justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <div className="text-center mb-10">
             <h2 className="text-3xl font-bold text-slate-900 mb-3">Begin Enrollment</h2>
             <p className="text-slate-500 font-medium max-w-lg mx-auto">Please provide exact details so our verified NIOS counselors can generate your admission ticket swiftly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Legal First Name</Label>
                <Input id="firstName" required className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Legal Last Name</Label>
                <Input id="lastName" required className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="Doe" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Active Email</Label>
                 <Input id="email" type="email" required className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="student@example.com" />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Mobile Carrier</Label>
                 <Input id="phone" type="tel" required className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" placeholder="+91 000 000 0000" />
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Highest Qualification Attempted</Label>
              <select id="qualification" required className="flex h-14 w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
                 <option value="" disabled selected>Select an option...</option>
                 <option value="8th">8th Standard / Middle School</option>
                 <option value="9th">9th Standard</option>
                 <option value="10th">10th Standard / Secondary</option>
                 <option value="11th">11th Standard</option>
                 <option value="12th">12th Standard / Senior Secondary</option>
              </select>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 mt-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all text-lg">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  Submit Enrollment Request
                  <Send className="w-5 h-5 ml-1" />
                </div>
              )}
            </Button>
          </form>
        </motion.div>
      </section>

      {/* Minimum Spacer Header Matching */}
      {!hideHeaderFooter && (
        <footer className="bg-white border-t border-slate-100 py-10 text-center mt-auto">
          <p className="text-slate-500 font-medium text-sm">
            &copy; {new Date().getFullYear()} K.E. Career Institute. All rights reserved.
          </p>
        </footer>
      )}
    </div>
  );
};

export default Admission;
