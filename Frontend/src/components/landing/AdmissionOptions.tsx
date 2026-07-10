import { User, FileCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AdmissionOptions = () => {
  return (
    <section className="py-12 bg-gray-50 pb-24 border-b border-slate-100" id="admission-options">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Validated Admission Pipelines</h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-10">Select the enrollment structure perfectly suited to your graduation requirements guided seamlessly by K.E.</p>

        <div className="w-full max-w-4xl mx-auto mb-10 rounded-2xl shadow-xl border border-slate-200 overflow-hidden bg-slate-900 flex items-center justify-center">
          <img 
            src="/Banner/banner0.png" 
            alt="Latest Admission Poster" 
            className="w-full max-h-[600px] object-contain" 
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Public Option */}
          <Link to="/admission" className="flex-1 flex items-center justify-center gap-1 bg-primary text-white py-4 px-6 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 transition-all">
            <User className="w-[18px] h-[18px] fill-current text-blue-200" />
            <span className="font-bold text-[16px] tracking-wide">Public Enrollment</span>
          </Link>

          {/* On-Demand Option */}
          <Link to="/admission" className="flex-1 flex items-center justify-center gap-3 bg-white text-slate-800 border border-slate-200 py-4 px-6 rounded-2xl shadow-sm hover:border-primary hover:text-primary hover:shadow-xl hover:-translate-y-1 transition-all">
            <FileCheck className="w-[18px] h-[18px] text-blue-500" />
            <span className="font-bold text-[16px] tracking-wide">On-Demand Tests</span>
          </Link>

          {/* Dual Admission Option */}
          <Link to="/admission" className="flex-1 flex items-center justify-center gap-3 bg-blue-50 text-blue-900 border border-blue-100 py-4 px-6 rounded-2xl shadow-sm hover:bg-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <Users className="w-[18px] h-[18px] fill-current text-blue-500" />
            <span className="font-bold text-[16px] tracking-wide">Dual Admission</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdmissionOptions;
