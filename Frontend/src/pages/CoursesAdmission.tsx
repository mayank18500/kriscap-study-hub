import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Contact } from "lucide-react";
import Courses from "./Courses";
import Admission from "./Admission";

const CoursesAdmission = () => {
  return (
    <div className="w-full px-6 md:px-12 pb-12">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Courses & Admission</h2>
        <p className="text-slate-500 italic mt-2">Explore academic programs and apply for enrollment securely.</p>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100 rounded-2xl mb-8">
          <TabsTrigger value="courses" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <BookOpen className="w-4 h-4" />
              <span>Courses</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="admission" className="rounded-xl py-3 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <Contact className="w-4 h-4" />
              <span>Admission</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white">
            <Courses hideHeaderFooter={true} />
          </div>
        </TabsContent>

        <TabsContent value="admission" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white">
            <Admission hideHeaderFooter={true} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesAdmission;
