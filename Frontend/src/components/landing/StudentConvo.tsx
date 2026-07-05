import { Users } from 'lucide-react';

const StudentConvo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#eef5fc] to-white text-gray-900 border-b border-gray-100">
      <div className="w-full px-6 md:px-12 max-w-none">
        
        {/* Conversation Section */}
        <div className="relative max-w-3xl mx-auto flex flex-col gap-6">
          {/* Student Message */}
          <div className="flex flex-row-reverse items-start gap-3 sm:gap-4 self-end max-w-[95%] sm:max-w-[85%]">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="font-bold text-slate-700 text-[10px] sm:text-xs uppercase tracking-wider font-body">Student</span>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tr-none shadow-sm border border-slate-200 relative">
              <p className="text-slate-800 font-semibold text-sm sm:text-base font-body leading-relaxed">
                Kriscap sir, what makes K.E. different from others?
              </p>
            </div>
          </div>

          {/* Kriscap Sir Message */}
          <div className="flex flex-row items-start gap-3 sm:gap-4 self-start max-w-[95%] sm:max-w-[85%]">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="font-bold text-slate-700 text-[10px] sm:text-xs uppercase tracking-wider font-body">Kriscap Sir</span>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 shadow-md flex items-center justify-center overflow-hidden bg-white">
                <img 
                  src="https://ui-avatars.com/api/?name=Kriscap+Sir&background=random" 
                  alt="Kriscap Sir" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 relative">
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-semibold font-body">
                At K.E., we don't just give degrees; we build careers. We train you to leave behind odd jobs and step into a dignified, professional life. Here, education means employment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StudentConvo;
