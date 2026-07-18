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

  const handleAddToCart = (course: any) => {
    toast({
      title: "Course Added to Cart",
      description: `${course.title} has been staged for purchase.`,
    });
  };

  return (
    <div className={`flex flex-col ${!hideHeaderFooter ? "min-h-screen bg-slate-50 dark:bg-slate-950 pt-16" : "bg-white dark:bg-slate-950"}`}>
      {!hideHeaderFooter && <Header />}
      
      {/* Dynamic Hero Section */}
      <section className={`relative overflow-hidden bg-[#0b1f3c] dark:bg-slate-900 px-4 lg:px-8 ${hideHeaderFooter ? "py-12" : "pt-12 pb-16"}`}>
        <div className="absolute inset-0 bg-[url('/img/hero-student.png')] bg-cover bg-center opacity-[0.08] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3c] dark:from-slate-900 via-transparent to-transparent" />
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        
        <div className="w-full px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 font-medium text-sm backdrop-blur-md shadow-2xl">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200">Verified Syllabus Access</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Curriculum Mastery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Certifications</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
              Explore our comprehensive suite of NIOS curriculum material and modern skill-development courses carefully tailored for immediate impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foundational Secondary Courses Grid */}
      <section className="py-16 px-6 md:px-12 w-full max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
               <BookOpen className="w-6 h-6 text-white" />
           </div>
           <div>
               <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Academic Foundations</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Class 10th and 12th NIOS Solved Materials</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SECONDARY_COURSES.map((course, idx) => {
            const ratingValue = 4.8;
            const reviewCount = 120 + (idx * 25);
            return (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-[24px] border border-slate-200/60 dark:border-slate-800/60 p-4 sm:p-5 flex flex-row gap-4 sm:gap-6 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer relative"
              >
                {/* Thumbnail Box */}
                <div className="w-28 h-28 sm:w-48 sm:h-44 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0 flex items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-800/50 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                  <BookOpen className="w-10 h-10 sm:w-14 sm:h-14 text-blue-600 dark:text-blue-500 drop-shadow-sm" />
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-md bg-[#0B1F3C] dark:bg-slate-950 text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-sm">
                    {course.category}
                  </span>
                  <span className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider hidden sm:inline-block shadow-sm">
                    Full Syllabus
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex-grow flex flex-col justify-between min-w-0">
                  <div className="space-y-2.5">
                    <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500 drop-shadow-sm" />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">{ratingValue.toFixed(1)}</span>
                      <span className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 hover:underline">({reviewCount} reviews)</span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md">
                        Best Seller
                      </span>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md">
                        Certified
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {course.features.map((feature, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[10px] sm:text-xs font-semibold border border-slate-200/50 dark:border-slate-700/50">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">₹{course.price}</span>
                        <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 line-through font-medium">M.R.P.: ₹{course.price + 500}</span>
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">(25% Off)</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        Includes <span className="text-emerald-600 dark:text-emerald-400 font-bold">1 Yr Access</span>
                      </p>
                    </div>

                    <Button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(course); }}
                      className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white h-9 sm:h-11 px-4 sm:px-6 font-bold shadow-lg shadow-amber-500/25 transition-all active:scale-95 text-xs border-0"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
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
      <section className="py-16 px-6 md:px-12 w-full max-w-[1400px] mx-auto border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
               <Award className="w-6 h-6 text-white" />
           </div>
           <div>
               <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Professional Certifications</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Standalone skill building for the modern workforce</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PRO_COURSES.map((course, idx) => {
            const ratingValue = 4.7;
            const reviewCount = 95 + (idx * 15);
            return (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-[24px] border border-slate-200/60 dark:border-slate-800/60 p-4 sm:p-5 flex flex-row gap-4 sm:gap-6 hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-500/30 transition-all duration-300 cursor-pointer relative"
              >
                {/* Thumbnail Box */}
                <div className="w-28 h-28 sm:w-48 sm:h-44 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0 flex items-center justify-center rounded-2xl border border-slate-100 dark:border-slate-800/50 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                  <Award className="w-10 h-10 sm:w-14 sm:h-14 text-purple-600 dark:text-purple-500 drop-shadow-sm" />
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-md bg-[#0B1F3C] dark:bg-slate-950 text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-sm">
                    {course.category}
                  </span>
                  <span className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-purple-600 dark:bg-purple-500/20 dark:text-purple-400 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider hidden sm:inline-block shadow-sm">
                    Certification
                  </span>
                </div>

                {/* Course Details */}
                <div className="flex-grow flex flex-col justify-between min-w-0">
                  <div className="space-y-2.5">
                    <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < 4 ? "fill-amber-500 text-amber-500 drop-shadow-sm" : "text-slate-300 dark:text-slate-700"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">{ratingValue.toFixed(1)}</span>
                      <span className="text-[10px] sm:text-xs text-purple-600 dark:text-purple-400 hover:underline">({reviewCount} reviews)</span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md">
                        Best Seller
                      </span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md">
                        Skill Build
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {course.features.map((feature, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[10px] sm:text-xs font-semibold border border-slate-200/50 dark:border-slate-700/50">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">₹{course.price}</span>
                        <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 line-through font-medium">M.R.P.: ₹{course.price + 400}</span>
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">(15% Off)</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                        Includes <span className="text-emerald-600 dark:text-emerald-400 font-bold">Lifetime Access</span>
                      </p>
                    </div>

                    <Button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(course); }}
                      className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-9 sm:h-11 px-4 sm:px-6 font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-95 text-xs border-0"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
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
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 py-10 text-center mt-auto">
          <p className="text-slate-500 dark:text-slate-500 font-medium text-sm">
            &copy; {new Date().getFullYear()} Kriscap Education. All rights reserved.
          </p>
        </footer>
      )}
    </div>
  );
};

export default Courses;
