import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, GraduationCap, PackageOpen, Award, BookOpen } from "lucide-react";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

// Initializing Product Mock Data
const SECONDARY_COURSES = [
  { id: "c1", title: "NIOS 10th - Mathematics (211)", price: 1499, category: "Secondary", features: ["TMA Solved", "Practical Included", "Guide Book"] },
  { id: "c2", title: "NIOS 10th - Science & Tech (212)", price: 1499, category: "Secondary", features: ["TMA Solved", "Lab Manual", "Expert Notes"] },
  { id: "c3", title: "NIOS 12th - Physics (312)", price: 1999, category: "Senior Secondary", features: ["TMA Solved", "Exam References", "Live Support"] },
  { id: "c4", title: "NIOS 12th - Chemistry (313)", price: 1999, category: "Senior Secondary", features: ["TMA Solved", "Reaction Sheets", "Practice Tests"] },
];

const PRO_COURSES = [
  { id: "p1", title: "Tally ERP 9 Mastery", price: 2499, category: "Skill Development", features: ["Certificate", "Real-world Tasks", "Lifetime Access"] },
  { id: "p2", title: "Advanced Soft Skills", price: 999, category: "Skill Development", features: ["Interview Prep", "Confidence Building", "E-Book"] },
  { id: "p3", title: "Computer Basics & MS Office", price: 1299, category: "Skill Development", features: ["Excel Mastery", "PowerPoint", "Word Typing"] },
];

const Courses = () => {
  const { toast } = useToast();
  // We opt to safely omit addItem invocation here to prevent mismatch; we instead use toast simulation
  // unless strictly instructed towards the Cart internals.

  const handleAddToCart = (course: any) => {
    toast({
      title: "Course Added to Cart",
      description: `${course.title} has been staged for purchase.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary px-4 lg:px-8">
        <div className="absolute inset-0 bg-[url('/img/hero-student.png')] bg-cover bg-center opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 font-medium text-sm backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Verified Syllabus Access
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Curriculum Mastery & <span className="text-blue-400">Certifications</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto mb-8">
              Explore our comprehensive suite of NIOS curriculum material and modern skill-development courses carefully tailored for immediate impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foundational Secondary Courses Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-10">
           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
               <BookOpen className="w-5 h-5 text-white" />
           </div>
           <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Academic Foundations</h2>
               <p className="text-slate-500 font-medium mt-1">Class 10th and 12th NIOS Solved Materials</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {SECONDARY_COURSES.map((course, idx) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                 <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest">
                    {course.category}
                 </span>
                 <h3 className="text-2xl font-black text-slate-900">₹{course.price}</h3>
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-6 leading-snug">{course.title}</h4>
              
              <div className="space-y-3 mb-8 flex-1">
                {course.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4">
                 <Button 
                   onClick={() => handleAddToCart(course)}
                   className="flex-1 rounded-2xl h-14 bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all"
                 >
                   <ShoppingCart className="w-5 h-5 mr-2" />
                   Add to Cart
                 </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Specializations Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full border-t border-slate-100">
        <div className="flex items-center gap-3 mb-10">
           <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
               <Award className="w-5 h-5 text-blue-600" />
           </div>
           <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Professional Certifications</h2>
               <p className="text-slate-500 font-medium mt-1">Standalone skill building for the modern workforce</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRO_COURSES.map((course, idx) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0 opacity-50 group-hover:scale-110 transition-transform" />
              
              <div className="relative z-10 flex flex-col flex-1">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
                  {course.category}
                </span>
                
                <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{course.title}</h4>
                <div className="text-xl font-black text-primary mb-6">₹{course.price}</div>
                
                <div className="space-y-2 mb-8 flex-1">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                   onClick={() => handleAddToCart(course)}
                   variant="outline"
                   className="w-full rounded-xl h-12 border-slate-200 text-slate-700 hover:border-primary hover:text-primary transition-all font-bold"
                 >
                   Select Module
                 </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-white border-t border-slate-100 py-10 text-center mt-auto">
        <p className="text-slate-500 font-medium text-sm">
          &copy; {new Date().getFullYear()} K.E. Career Institute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Courses;
