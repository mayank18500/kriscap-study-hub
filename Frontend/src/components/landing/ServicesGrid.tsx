import { motion } from "framer-motion";
import { BookOpen, FileText, FlaskConical, GraduationCap, Library, HeadphonesIcon, MessageCircle } from "lucide-react";

const services = [
  {
    title: "Admission Guidance",
    description: "Expert assistance with NIOS registration and subject selection.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-blue-600 bg-blue-100"
  },
  {
    title: "TMA Solutions",
    description: "Verified Tutor Marked Assignments to help you score better.",
    icon: <FileText className="w-6 h-6" />,
    color: "text-emerald-600 bg-emerald-100"
  },
  {
    title: "Practical Files",
    description: "Comprehensive and correctly formatted practical notebooks.",
    icon: <FlaskConical className="w-6 h-6" />,
    color: "text-purple-600 bg-purple-100"
  },
  {
    title: "Viva Preparation",
    description: "Important questions and tips to crack your viva exams.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "text-amber-600 bg-amber-100"
  },
  {
    title: "Study Material & PYQs",
    description: "Previous year questions and condensed notes for quick revision.",
    icon: <Library className="w-6 h-6" />,
    color: "text-sky-600 bg-sky-100"
  },
  {
    title: "24/7 Guidance",
    description: "Continuous support throughout your NIOS journey.",
    icon: <HeadphonesIcon className="w-6 h-6" />,
    color: "text-indigo-600 bg-indigo-100"
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive <span className="text-blue-600">Study Support</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to excel in your NIOS examinations, conveniently accessible in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
              
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-500" />
                Book on WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
