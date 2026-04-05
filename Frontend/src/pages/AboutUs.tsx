import { motion } from "framer-motion";
import { GraduationCap, Target, Users, BookOpen, Layers, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/landing/Header";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary px-4 lg:px-8">
        <div className="absolute inset-0 bg-[url('/img/hero-student.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 font-medium text-sm backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Established Educational Institution
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Empowering Your <span className="text-blue-400">NIOS</span> Education Journey
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
              K.E. Career Institute provides highly curated, expertly verified study materials, assignments, and practicals to ensure you achieve academic excellence with ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Students", value: "10,000+", icon: Users },
              { label: "Verified Files", value: "500+", icon: BookOpen },
              { label: "Success Rate", value: "98%", icon: Target },
              { label: "Support", value: "24/7", icon: ShieldCheck },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Features */}
      <section className="py-24 px-6 relative bg-gray-50 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  Our Mission is to Simplify Distance Education
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We understand the unique challenges faced by NIOS students. Balancing self-study with extensive assignments can be overwhelming. Our platform acts as a bridge, delivering expertly crafted TMA files and practical manuals directly to your dashboard.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "TMA & Practical Solving", icon: Layers, desc: "Sourced strictly from current syllabus requirements." },
                  { title: "Verified Deliveries", icon: ShieldCheck, desc: "Instant digital access paired with home delivery options." },
                  { title: "Syllabus Accuracy", icon: BookOpen, desc: "Regularly updated to stay strictly within NIOS guidelines." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-200/20">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-600">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{feature.title}</h4>
                      <p className="text-slate-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-square"
            >
               <img src="/img/hero-student.png" alt="Student" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
               
               <div className="absolute bottom-10 left-10 right-10">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                   <h3 className="font-bold text-xl mb-2">Join the Academy</h3>
                   <p className="text-white/80 text-sm mb-4">Start your streamlined learning path today with instant digital resources.</p>
                   <Link to="/register" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-primary px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                     Get Started
                   </Link>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 text-center">
        <p className="text-slate-500 font-medium text-sm">
          &copy; {new Date().getFullYear()} K.E. Career Institute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
