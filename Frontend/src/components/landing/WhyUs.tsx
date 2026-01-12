import { motion } from "framer-motion";
import { Target, ShieldCheck, Wallet, Headphones, Star, Clock } from "lucide-react";

const WhyUs = () => {
  const reasons = [
    {
      icon: Target,
      title: "NIOS-Specific Content",
      description: "All materials are specifically designed for NIOS curriculum requirements and exam patterns.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Material",
      description: "Every file is carefully reviewed and verified by subject experts for accuracy and quality.",
    },
    {
      icon: Wallet,
      title: "Affordable Pricing",
      description: "Quality education materials at student-friendly prices. Best value guaranteed.",
    },
    {
      icon: Headphones,
      title: "Student Support",
      description: "Dedicated WhatsApp support to help you with any queries or issues.",
    },
    {
      icon: Clock,
      title: "Instant Access",
      description: "Download TMA files instantly after payment. No waiting, start studying immediately.",
    },
    {
      icon: Star,
      title: "High Quality",
      description: "Professionally prepared materials with proper formatting and presentation.",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Kriscap Education?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by thousands of NIOS students across India
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl border border-border p-6 h-full card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
