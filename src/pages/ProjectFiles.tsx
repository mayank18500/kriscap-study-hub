import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Eye, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const projectFiles = [
    { id: 1, name: "Physics Investigatory Project", class: "12", price: 499, rating: 4.9, reviews: 45, delivery: "3-5 days" },
    { id: 2, name: "Chemistry Investigatory Project", class: "12", price: 499, rating: 4.8, reviews: 38, delivery: "3-5 days" },
    { id: 3, name: "Biology Investigatory Project", class: "12", price: 499, rating: 4.9, reviews: 42, delivery: "3-5 days" },
    { id: 4, name: "Mathematics Project", class: "12", price: 449, rating: 4.7, reviews: 56, delivery: "3-5 days" },
    { id: 5, name: "Science Project", class: "10", price: 399, rating: 4.8, reviews: 67, delivery: "3-5 days" },
    { id: 6, name: "Social Science Project", class: "10", price: 399, rating: 4.6, reviews: 34, delivery: "3-5 days" },
  ];

  const filteredFiles = projectFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Home Delivery Available</h3>
          <p className="text-sm text-muted-foreground">
            All project files are delivered to your doorstep within 3-5 business days.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="card-hover h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Class {file.class}
                  </span>
                </div>
                
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {file.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete Project • Home Delivery
                </p>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{file.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({file.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{file.delivery}</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-secondary">
                    ₹{file.price}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Order
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ProjectFiles;
