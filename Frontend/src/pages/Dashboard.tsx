import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { 
  BookOpen, 
  Download, 
  Video, 
  Trophy, 
  ArrowRight,
  Clock,
  CheckCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch user's orders/downloads summary
  const { data: downloads } = useQuery({
    queryKey: ["myDownloadsSummary"],
    queryFn: async () => {
      const res = await api.get("/api/downloads");
      return res.data?.data || [];
    },
  });

  // Fetch upcoming classes
  const { data: classes } = useQuery({
    queryKey: ["upcomingClasses"],
    queryFn: async () => {
      const res = await api.get("/api/classes");
      return res.data?.data || [];
    },
  });

  return (
    <div className="w-full px-6 md:px-12 pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0b1f3c] to-[#1e3a5f] rounded-[2rem] p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy size={160} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2">Welcome back, {user?.firstName || user?.name || "Student"}! 🎓</h1>
          <p className="text-blue-100 max-w-xl">
            You're making great progress. Check your upcoming classes and recent downloads below to continue your learning journey.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Stats & Classes */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Courses</p>
                <p className="text-2xl font-black text-slate-900">0</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Files</p>
                <p className="text-2xl font-black text-slate-900">{downloads?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Live Classes */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                Live Classes
              </h2>
            </div>
            <div className="p-6">
              {classes && classes.length > 0 ? (
                <div className="space-y-4">
                  {classes.slice(0, 3).map((cls: any) => (
                    <div key={cls.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="bg-white p-3 rounded-lg shadow-sm text-center min-w-[70px]">
                        <p className="text-xs text-red-500 font-bold uppercase">{new Date(cls.scheduledAt).toLocaleString('default', { month: 'short' })}</p>
                        <p className="text-xl font-black text-slate-900">{new Date(cls.scheduledAt).getDate()}</p>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-slate-900 line-clamp-1">{cls.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(cls.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {cls.subject || "General"}</span>
                        </div>
                      </div>
                      <Button size="sm" className="shrink-0 bg-[#0b1f3c] text-white rounded-full">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">No upcoming classes scheduled.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Downloads */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Recent Files
              </h2>
            </div>
            <div className="p-6">
              {downloads && downloads.length > 0 ? (
                <div className="space-y-4">
                  {downloads.slice(0, 4).map((d: any) => (
                    <div key={d.id} className="flex gap-3 items-start border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug mb-1">
                          {d.product?.name || "Purchased File"}
                        </p>
                        <p className="text-xs text-slate-400">Class {d.product?.class} • {d.product?.subject}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 rounded-full font-bold text-[#0b1f3c] border-slate-200">
                    View All Downloads <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-500 text-sm">You haven't downloaded any files yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
