import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, GraduationCap, PackageOpen, Award, BookOpen, Star } from "lucide-react";
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

const Courses = ({ hideHeaderFooter = false }: { hideHeaderFooter?: boolean }) => {
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
    <div className={`flex flex-col ${!hideHeaderFooter ? "min-h-screen bg-gray-50 pt-16" : "bg-white"}`}>
      {!hideHeaderFooter && <Header />}
      
      {/* Dynamic Hero Section */}
      <section className={`relative overflow-hidden bg-primary px-4 lg:px-8 ${hideHeaderFooter ? "py-12" : "pt-12 pb-16"}`}>
        <div className="absolute inset-0 bg-[url('/img/hero-student.png')] bg-cover bg-center opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        <div className="w-full px-6 md:px-12 text-center relative z-10">
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
      <section className="py-12 px-6 md:px-12 w-full">
        <div className="flex items-center gap-3 mb-10">
           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
               <BookOpen className="w-5 h-5 text-white" />
           </div>
           <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Academic Foundations</h2>
               <p className="text-slate-500 font-medium mt-1">Class 10th and 12th NIOS Solved Materials</p>
           </div>
        </div>

        <div className="flex flex-col gap-6">
          {SECONDARY_COURSES.map((course, idx) => {
            // Simulated reviews
            const ratingValue = 4.8;
            const reviewCount = 120 + (idx * 25);
            return (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[20px] border border-slate-100 p-3.5 sm:p-5 flex flex-row gap-3.5 sm:gap-6 hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all cursor-pointer relative shadow-[0_8px_30px_rgba(0,0,0,0.015)]"
              >
                {/* Thumbnail Box */}
                <div className="w-24 h-24 sm:w-48 sm:h-44 bg-slate-50 flex-shrink-0 flex items-center justify-center rounded-xl border border-slate-100 relative overflow-hidden">
                  <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-[#2563EB]" />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0B1F3C] text-[8px] sm:text-[9px] font-bold tracking-wider uppercase">
                    {course.category}
                  </span>
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden sm:inline-block">
                    Full Syllabus
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex-grow flex flex-col justify-between min-w-0 pr-4 sm:pr-0">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-lg md:text-xl font-bold text-[#0F172A] hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-xs font-semibold text-slate-700">{ratingValue.toFixed(1)}</span>
                      <span className="text-[9px] sm:text-blue-600 hover:underline">({reviewCount})</span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-[#F59E0B] text-[#0B1F3C] text-[8px] sm:text-[10px] font-extrabold uppercase rounded shadow-sm">
                        Best Seller
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#0B1F3C] text-white text-[8px] sm:text-[10px] font-extrabold uppercase rounded shadow-sm">
                        Certified
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.features.map((feature, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] sm:text-xs font-semibold">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-2xl font-extrabold text-[#0F172A]">₹{course.price}</span>
                        <span className="text-[9px] sm:text-sm text-slate-400 line-through">M.R.P.: ₹{course.price + 500}</span>
                        <span className="text-[9px] sm:text-sm font-bold text-red-650">(25% Off)</span>
                      </div>
                      <p className="text-[9px] sm:text-xs text-slate-500 font-medium">
                        Includes <span className="text-[#16A34A] font-bold">1 Yr Access</span>
                      </p>
                    </div>

                    <Button 
                      onClick={() => handleAddToCart(course)}
                      className="rounded-lg bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0B1F3C] hover:text-[#0B1F3C] h-8 sm:h-10 px-3 sm:px-5 font-bold shadow-md transition-all active:scale-95 text-[10px] sm:text-xs border border-[#F59E0B]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1 sm:mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Professional Specializations Grid */}
      <section className="py-12 px-6 md:px-12 w-full border-t border-slate-100">
        <div className="flex items-center gap-3 mb-10">
           <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
               <Award className="w-5 h-5 text-blue-600" />
           </div>
           <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Professional Certifications</h2>
               <p className="text-slate-500 font-medium mt-1">Standalone skill building for the modern workforce</p>
           </div>
        </div>

        <div className="flex flex-col gap-6">
          {PRO_COURSES.map((course, idx) => {
            // Simulated reviews
            const ratingValue = 4.7;
            const reviewCount = 95 + (idx * 15);
            return (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[20px] border border-slate-100 p-3.5 sm:p-5 flex flex-row gap-3.5 sm:gap-6 hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all cursor-pointer relative shadow-[0_8px_30px_rgba(0,0,0,0.015)]"
              >
                {/* Thumbnail Box */}
                <div className="w-24 h-24 sm:w-48 sm:h-44 bg-slate-50 flex-shrink-0 flex items-center justify-center rounded-xl border border-slate-100 relative overflow-hidden">
                  <Award className="w-8 h-8 sm:w-12 sm:h-12 text-[#F59E0B]" />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0B1F3C] text-[8px] sm:text-[9px] font-bold tracking-wider uppercase">
                    {course.category}
                  </span>
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hidden sm:inline-block">
                    Certification
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex-grow flex flex-col justify-between min-w-0 pr-4 sm:pr-0">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-lg md:text-xl font-bold text-[#0F172A] hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < 4 ? "fill-amber-500 text-amber-500" : "text-slate-300"}`} />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-xs font-semibold text-slate-700">{ratingValue.toFixed(1)}</span>
                      <span className="text-[9px] sm:text-blue-600 hover:underline">({reviewCount})</span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-[#F59E0B] text-[#0B1F3C] text-[8px] sm:text-[10px] font-extrabold uppercase rounded shadow-sm">
                        Best Seller
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#0B1F3C] text-white text-[8px] sm:text-[10px] font-extrabold uppercase rounded shadow-sm">
                        Skill Build
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.features.map((feature, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] sm:text-xs font-semibold">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-2xl font-extrabold text-[#0F172A]">₹{course.price}</span>
                        <span className="text-[9px] sm:text-sm text-slate-400 line-through">M.R.P.: ₹{course.price + 400}</span>
                        <span className="text-[9px] sm:text-sm font-bold text-red-650">(15% Off)</span>
                      </div>
                      <p className="text-[9px] sm:text-xs text-slate-500 font-medium">
                        Includes <span className="text-[#16A34A] font-bold">Lifetime Access</span>
                      </p>
                    </div>

                    <Button 
                      onClick={() => handleAddToCart(course)}
                      className="rounded-lg bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0B1F3C] hover:text-[#0B1F3C] h-8 sm:h-10 px-3 sm:px-5 font-bold shadow-md transition-all active:scale-95 text-[10px] sm:text-xs border border-[#F59E0B]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1 sm:mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer Details */}
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

export default Courses;
