import { motion } from "framer-motion";
import { Download, FileText, Calendar, ShieldCheck, Loader2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 font-medium font-serif">
        The digital archive is currently unreachable. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      {/* Aesthetic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-slate-900">Digital Library</h2>
          <p className="text-slate-500 italic">Access your permanent collection of academic resources.</p>
        </div>
        <div className="hidden md:block h-[1px] flex-grow mx-8 bg-slate-200 mb-2 opacity-50" />
      </div>

      {/* Security Banner: "The Official Seal" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-slate-900 text-white rounded-2xl p-6 overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={80} />
        </div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg tracking-wide">Archival Security Guaranteed</h3>
            <p className="text-slate-400 text-sm">
              Your purchased documents are cryptographically secured and available for indefinite retrieval.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Downloads List: "The Ledger" */}
      <div className="space-y-4">
        {downloads.map((file: any, index: number) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group"
          >
            <Card className="border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                  <div className="flex items-center gap-5">
                    {/* Academic Icon */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-[#fdfcf8] border border-slate-100 flex items-center justify-center transition-colors group-hover:border-amber-200">
                        <FileText className="w-6 h-6 text-slate-700 group-hover:text-amber-600" />
                      </div>
                      <Bookmark className="absolute -top-1 -left-1 w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>

                    <div>
                      <h4 className="font-serif text-lg font-bold text-slate-900 leading-none mb-2 group-hover:text-amber-700 transition-colors">
                        {file.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(file.date), "MMM dd, yyyy")}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-500">
                          {file.size || "PDF Document"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDownload(file.fileUrl, file.name)}
                    className="h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 font-bold shadow-md hover:-translate-y-1 transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Retrieve File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {downloads.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2rem]"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <FileText className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-400 mb-2">The Archive is Empty</h3>
            <p className="text-slate-400 italic max-w-xs mx-auto">
              Once you enroll in a subject or purchase a TMA, your digital assets will be cataloged here.
            </p>
          </motion.div>
        )}
      </div>

      <div className="pt-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
          Kriscap Digital Repository Protocol 2.0
        </p>
      </div>
    </div>
  );
};

export default Downloads;