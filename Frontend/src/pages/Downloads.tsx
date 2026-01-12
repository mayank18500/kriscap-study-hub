import { useRef } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format } from "date-fns";

const Downloads = () => {
  const { data: downloads, isLoading, isError } = useQuery({
    queryKey: ["downloads"],
    queryFn: async () => {
      const response = await api.get("/api/user/downloads");
      return response.data;
    },
  });

  const handleDownload = (url: string, fileName: string) => {
    // Create a temporary link to force download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading downloads</div>;
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Your Files Are Secure</h3>
          <p className="text-sm text-muted-foreground">
            All purchased TMA files are available for unlimited downloads.
          </p>
        </div>
      </motion.div>

      {/* Downloads List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">Available Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {downloads.map((file: any, index: number) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{file.name}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(file.date), "MMM d, yyyy")}
                      </span>
                      <span>{file.size}</span>
                      {/* <span>{file.downloads} downloads</span> */}
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleDownload(file.fileUrl, file.name)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {downloads.length === 0 && (
        <div className="text-center py-12">
          <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No downloads yet</h3>
          <p className="text-muted-foreground">Purchase TMA files to see them here</p>
        </div>
      )}
    </div>
  );
};

export default Downloads;
