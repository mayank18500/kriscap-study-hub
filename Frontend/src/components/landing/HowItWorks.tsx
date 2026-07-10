import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck, CreditCard, PackageCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "1",
      title: "Contact Us",
      description: "Reach out via WhatsApp to discuss your requirements and academic needs.",
    },
    {
      icon: CalendarCheck,
      number: "2",
      title: "Book Service",
      description: "Select the specific study material, TMA, or guidance package you need.",
    },
    {
      icon: CreditCard,
      number: "3",
      title: "Complete Payment",
      description: "Make a secure transaction using UPI, Cards, or Net Banking.",
    },
    {
      icon: PackageCheck,
      number: "4",
      title: "Receive Material",
      description: "Get instant digital access or track your physical delivery to your doorstep.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A simple, transparent process to get the support you need without any hassle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-slate-100" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center group"
            >
              {/* Icon Orb */}
              <div className="relative mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg relative z-10 group-hover:border-blue-200">
                  <step.icon className="w-10 h-10 text-blue-600" />
                </div>
                {/* Number Badge */}
                <div className="absolute -top-3 right-1/4 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md z-20 border-2 border-white">
                  {step.number}
                </div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;