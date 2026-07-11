import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, GraduationCap, Send, Loader2, Contact, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
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
              Join Kriscap Education for guaranteed admission protocols, stress-free documentation, and immediate verified coursework access.
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

      {/* NIOS Plans 2026 Section */}
      <section className="py-12 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> NIOS Plan 2026
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Affordable Packages & Per-Subject Services
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm leading-relaxed">
            100% genuine work with complete guidance from admission to results. Select your service or contact us directly on WhatsApp.
          </p>
        </div>

        {/* Primary Packages */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Admission Assistance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
              Registration
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Class 10th, 12th & Fail Admission</h3>
              <p className="text-slate-500 text-sm mb-6">Complete enrollment guidance, personal teacher assistance, and failure admission support.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">₹2,000 - ₹6,000</span>
                  <span className="text-slate-400 text-xs font-semibold">/ package</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs text-slate-650 font-medium">Booking amount: <strong>₹500</strong> to secure slot</span>
                </div>
                <ul className="space-y-2.5 text-slate-600 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Personal teacher support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Admission to result end-to-end help</span>
                  </li>
                </ul>
              </div>
            </div>
            <a 
              href="https://wa.me/917023057797?text=Hello,%20I%20want%20to%20inquire%20about%20NIOS%20Class%2010th/12th%20Admission"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489 0 9.953-4.467 9.957-9.96.002-2.661-1.034-5.163-2.914-7.046C16.435 1.766 13.935.73 11.278.73c-5.489 0-9.956 4.468-9.96 9.961-.001 1.9.492 3.754 1.428 5.367l-.955 3.486 3.568-.936zm11.352-7.227c-.297-.148-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Inquire via WhatsApp
            </a>
          </motion.div>

          {/* Card 2: Complete Package */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
              Pay After Exam
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Complete NIOS Package</h3>
              <p className="text-slate-500 text-sm mb-6">The ultimate stress-free package covering all custom assignments, study materials, and practical file uploads.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">₹2,500</span>
                  <span className="text-slate-400 text-xs font-semibold">/ Per Subject</span>
                </div>
                <div className="p-3 bg-green-50/50 rounded-xl border border-green-100 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-slate-650 font-medium"><strong>No advance needed</strong> — pay after exams are completed!</span>
                </div>
                <ul className="space-y-2.5 text-slate-600 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>100% Genuine Work guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Complete support from day one to results</span>
                  </li>
                </ul>
              </div>
            </div>
            <a 
              href="https://wa.me/917023057797?text=Hello,%20I%20want%20to%20opt%20for%20the%20Complete%20NIOS%20Package"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
            >
              Book Complete Package
            </a>
          </motion.div>
        </div>

        {/* Detailed Service Grid */}
        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Per-Subject Services & Custom Add-ons</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TMA */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">TMA Upload Service</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Complete TMA solution upload, securing good marks (18-20 marks guaranteed). 100% non-copyright solved materials.</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <span className="text-base font-extrabold text-blue-600">₹350 <span className="text-[10px] text-slate-400 font-semibold">/ subject</span></span>
              <span className="text-[10px] text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">Front Page: +₹50</span>
            </div>
          </div>

          {/* Practical File */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">Practical File</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">High-quality practical files. Choose from instant PDF downloads, custom-written files, or home courier delivery.</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 border-t border-slate-50 pt-3 text-center">
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="text-[9px] font-bold text-slate-400 uppercase">PDF</div>
                <div className="text-[11px] font-extrabold text-slate-700">₹350</div>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Written</div>
                <div className="text-[11px] font-extrabold text-slate-700">₹250</div>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Courier</div>
                <div className="text-[11px] font-extrabold text-slate-700">₹700</div>
              </div>
            </div>
          </div>

          {/* Viva */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">Viva Q&A PDF</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Exclusive practical examination viva questions & answers booklet to secure top marks in practical exams.</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <span className="text-base font-extrabold text-blue-600">₹300</span>
              <span className="text-[10px] text-slate-500 font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-100">PDF Available</span>
            </div>
          </div>

          {/* Study Material */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">Study Material Add-on</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Exhaustive chapter notes, guidebooks, and summary sheets. Standard PDF or printed hardcopy delivery options.</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <span className="text-base font-extrabold text-blue-600">₹350 <span className="text-[10px] text-slate-400 font-semibold">/ sub</span></span>
              <span className="text-[10px] text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">Delivery: +₹450/sub (+₹350 fee)</span>
            </div>
          </div>

          {/* PYQs & Special Paper */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">Solved PYQs & Special Papers</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Previous years questions with solutions (₹350), special curated test papers for On-Demand students (₹450), and top Imp Qs (₹350).</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 border-t border-slate-50 pt-3 text-center">
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="text-[9px] font-bold text-slate-400 uppercase">PYQs</div>
                <div className="text-[11px] font-extrabold text-slate-700">₹350</div>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Special</div>
                <div className="text-[11px] font-extrabold text-slate-700">₹450</div>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Imp Qs</div>
                <div className="text-[11px] font-extrabold text-slate-700">₹350</div>
              </div>
            </div>
          </div>

          {/* Guidance Support */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1.5">Guidance Support</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Always-on professional support team helping you clear admission doubts, fee payment updates, and syllabus changes.</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <span className="text-base font-extrabold text-blue-600">₹250 <span className="text-[10px] text-slate-400 font-semibold">/ course</span></span>
              <span className="text-[10px] text-slate-500 font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100">Team Guidance</span>
            </div>
          </div>
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
              <select id="qualification" required defaultValue="" className="flex h-14 w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
                 <option value="" disabled>Select an option...</option>
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
            &copy; {new Date().getFullYear()} Kriscap Education. All rights reserved.
          </p>
        </footer>
      )}
    </div>
  );
};

export default Admission;
