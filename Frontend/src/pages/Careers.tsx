import { Briefcase } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Join Our Team</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            At Kriscap Education, we're on a mission to make quality education accessible to every NIOS student. We're always looking for passionate individuals to join us.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 shadow rounded-2xl p-10 text-center border border-slate-100 dark:border-slate-800">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">No Open Positions Currently</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
            We don't have any open roles right now, but we're growing fast. Check back later or drop your resume so we have it on file.
          </p>
          <a href="mailto:careers@kriscap.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Send us your Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;
