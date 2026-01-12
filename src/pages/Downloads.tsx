import { motion } from "framer-motion";
import { Download, FileText, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Downloads = () => {
  const downloads = [
    { id: 1, name: "Mathematics Class 12 TMA", date: "Jan 10, 2024", size: "2.4 MB", downloads: 3 },
    { id: 2, name: "English Class 12 TMA", date: "Jan 5, 2024", size: "1.8 MB", downloads: 2 },
    { id: 3, name: "Hindi Class 12 TMA", date: "Jan 3, 2024", size: "1.6 MB", downloads: 1 },
    { id: 4, name: "Physics Class 12 TMA", date: "Dec 28, 2023", size: "2.1 MB", downloads: 4 },
    { id: 5, name: "Chemistry Class 12 TMA", date: "Dec 25, 2023", size: "2.3 MB", downloads: 2 },
    { id: 6, name: "Biology Class 12 TMA", date: "Dec 20, 2023", size: "2.0 MB", downloads: 1 },
  ];

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
            {downloads.map((file, index) => (
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
                        {file.date}
                      </span>
                      <span>{file.size}</span>
                      <span>{file.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                <Button>
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
