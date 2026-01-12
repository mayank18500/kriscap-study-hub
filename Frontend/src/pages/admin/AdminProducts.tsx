import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText, Package, Edit, Trash2, MoreVertical, Eye, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "TMA",
    class: "12",
    medium: "English",
    price: "",
    fileUrl: "",
    previewUrl: ""
  });



  const { data: products, isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const response = await api.get("/api/admin/products");
      return response.data;
    }
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      await api.post("/api/admin/products", productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      toast({ title: "Product Created", description: "Product has been added successfully" });
      setIsDialogOpen(false);
      setNewProduct({ name: "", type: "TMA", class: "12", medium: "English", price: "", fileUrl: "", previewUrl: "" });
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: "Failed to create product" });
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/api/admin/products/${id}/toggle`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    }
  });

  const handleCreateProduct = () => {
    createProductMutation.mutate({
      ...newProduct,
      price: Number(newProduct.price)
    });
  };

  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new TMA or Project file product
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  placeholder="e.g., Mathematics Class 12 TMA"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={newProduct.type} onValueChange={(v) => setNewProduct({ ...newProduct, type: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TMA">TMA File</SelectItem>
                      <SelectItem value="Project">Project File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={newProduct.class} onValueChange={(v) => setNewProduct({ ...newProduct, class: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Medium</Label>
                  <Select value={newProduct.medium} onValueChange={(v) => setNewProduct({ ...newProduct, medium: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="199"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
              </div>

              {/* File Links */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Link (Google Drive/External)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="https://drive.google.com/..."
                      value={newProduct.fileUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, fileUrl: e.target.value })}
                    />
                    {newProduct.fileUrl && <FileText className="text-green-500 w-5 h-5" />}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preview Image Link</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="https://imgur.com/..."
                      value={newProduct.previewUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, previewUrl: e.target.value })}
                    />
                    {newProduct.previewUrl && <Eye className="text-green-500 w-5 h-5" />}
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleCreateProduct} disabled={createProductMutation.isPending}>
                {createProductMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                Create Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Class</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sales</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any, index: number) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${product.type === "TMA" ? "bg-primary/10" : "bg-secondary/10"
                          }`}>
                          {product.type === "TMA" ? (
                            <FileText className="w-4 h-4 text-primary" />
                          ) : (
                            <Package className="w-4 h-4 text-secondary" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.type === "TMA" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        }`}>
                        {product.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">Class {product.class}</td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{product.price}</td>
                    <td className="py-3 px-4 text-muted-foreground">{product.sales}</td>
                    <td className="py-3 px-4">
                      <button className="flex items-center gap-1" onClick={() => toggleStatusMutation.mutate(product.id)}>
                        {product.active ? (
                          <ToggleRight className="w-6 h-6 text-success" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
