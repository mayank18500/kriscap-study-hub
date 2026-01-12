import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Package, ArrowRight, Download, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const categories = [
    {
      icon: FileText,
      emoji: "📘",
      title: "TMA Files",
      subtitle: "Digital Download",
      description: "Instantly download verified TMA files for all NIOS subjects. Get high-quality, well-researched answers.",
      features: ["Instant Download", "All Subjects", "Class 10 & 12", "Hindi & English Medium"],
      cta: "Browse TMA Files",
      link: "/tma-files",
      gradient: "from-primary to-primary/80",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Package,
      emoji: "📦",
      title: "Project Files",
      subtitle: "Home Delivery",
      description: "Order complete project files delivered to your doorstep. Professionally prepared with all required components.",
      features: ["Home Delivery", "Complete Projects", "Ready to Submit", "All India Delivery"],
      cta: "Order Project Files",
      link: "/project-files",
      gradient: "from-secondary to-secondary/80",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our comprehensive collection of NIOS study materials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl border border-border shadow-card card-hover p-6 lg:p-8 h-full">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl ${category.iconBg} flex items-center justify-center`}>
                    <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                  <span className="text-3xl">{category.emoji}</span>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                    {category.title}
                  </h3>
                  <p className={`text-sm font-medium ${category.iconColor} mb-3`}>
                    {category.subtitle}
                  </p>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {category.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.gradient}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to={category.link}>
                  <Button
                    variant={index === 0 ? "default" : "secondary"}
                    className="w-full group-hover:gap-4 transition-all"
                  >
                    {category.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
