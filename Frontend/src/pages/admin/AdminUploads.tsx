import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Search, Trash2, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Mock data for files
const INITIAL_FILES = [
    { id: 1, name: "Math_Class10_TMA.pdf", size: "2.5 MB", date: "2024-03-15", type: "pdf" },
    { id: 2, name: "Science_Class10_Project.pdf", size: "12.8 MB", date: "2024-03-14", type: "pdf" },
    { id: 3, name: "Physics_Class12_TMA.pdf", size: "3.2 MB", date: "2024-03-10", type: "pdf" },
    { id: 4, name: "Chemistry_Lab_Manual.pdf", size: "8.5 MB", date: "2024-03-08", type: "pdf" },
    { id: 5, name: "English_Core_Notes.docx", size: "1.2 MB", date: "2024-03-05", type: "doc" },
];

const AdminUploads = () => {
    const [files, setFiles] = useState(INITIAL_FILES);
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const handleUpload = () => {
        // Mock upload functionality
        toast({
            title: "Upload Successful",
            description: "File has been uploaded to the server.",
        });
        // Add a mock file
        setFiles([
            {
                id: Date.now(),
                name: `New_Upload_${new Date().getTime()}.pdf`,
                size: "1.0 MB",
                date: new Date().toISOString().split('T')[0],
                type: "pdf"
            },
            ...files
        ]);
    };

    const handleDelete = (id: number) => {
        setFiles(files.filter(f => f.id !== id));
        toast({
            title: "File Deleted",
            description: "The file has been removed permanently.",
            variant: "destructive"
        });
    };

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-heading font-bold">File Manager</h1>
                    <p className="text-muted-foreground">Manage your TMAs, Projects, and other resources.</p>
                </div>
                <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90 text-white gap-2">
                    <Upload className="w-4 h-4" />
                    Upload New File
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-heading hidden sm:block">All Files ({files.length})</CardTitle>
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Size</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date Uploaded</th>
                                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFiles.map((file, index) => (
                                    <motion.tr
                                        key={file.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b last:border-0 hover:bg-muted/50"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <span className="font-medium text-sm">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{file.size}</td>
                                        <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{file.date}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500/70 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(file.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
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

export default AdminUploads;
