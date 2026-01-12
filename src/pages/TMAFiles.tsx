import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Eye, ShoppingCart, Star } from "lucide-react";
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

const TMAFiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMedium, setSelectedMedium] = useState("all");

  const tmaFiles = [
    { id: 1, name: "Mathematics", class: "12", medium: "English", price: 199, rating: 4.8, reviews: 124 },
    { id: 2, name: "Physics", class: "12", medium: "English", price: 199, rating: 4.9, reviews: 98 },
    { id: 3, name: "Chemistry", class: "12", medium: "English", price: 199, rating: 4.7, reviews: 87 },
    { id: 4, name: "Biology", class: "12", medium: "English", price: 199, rating: 4.8, reviews: 65 },
    { id: 5, name: "English", class: "12", medium: "English", price: 149, rating: 4.6, reviews: 156 },
    { id: 6, name: "Hindi", class: "12", medium: "Hindi", price: 149, rating: 4.7, reviews: 143 },
    { id: 7, name: "गणित (Mathematics)", class: "10", medium: "Hindi", price: 149, rating: 4.8, reviews: 89 },
    { id: 8, name: "Science", class: "10", medium: "English", price: 179, rating: 4.9, reviews: 112 },
    { id: 9, name: "Social Science", class: "10", medium: "English", price: 149, rating: 4.5, reviews: 78 },
  ];

  const filteredFiles = tmaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || file.class === selectedClass;
    const matchesMedium = selectedMedium === "all" || file.medium === selectedMedium;
    return matchesSearch && matchesClass && matchesMedium;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
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
            <Select value={selectedMedium} onValueChange={setSelectedMedium}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mediums</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
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
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Class {file.class}
                  </span>
                </div>
                
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {file.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {file.medium} Medium • TMA File
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{file.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({file.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-primary">
                    ₹{file.price}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Buy
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
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No files found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default TMAFiles;
