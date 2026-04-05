import { CalendarDays, ListOrdered, CheckCircle2, MinusCircle, RefreshCcw } from "lucide-react";

const CallGuidance = () => {
  return (
    <section className="bg-[#FAFBFD] font-sans">
      {/* Thick Full Width Black Line */}
      <div className="w-full h-[4px] bg-black"></div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
          
          <div className="flex-1 space-y-6 md:pr-8">
            <h2 className="text-[28px] font-bold text-black mb-8">
              Proper Guidance on Call (NIOS)
            </h2>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-black text-[17px]">
                <CalendarDays className="w-6 h-6 text-[#173F7A]" />
                Daily Study Schedule
              </li>
              <li className="flex items-center gap-4 text-black text-[17px]">
                <ListOrdered className="w-6 h-6 text-[#173F7A]" />
                Important chapters for last-minute review
              </li>
              <li className="flex items-center gap-4 text-black text-[17px]">
                <CheckCircle2 className="w-6 h-6 text-[#173F7A]" />
                Scoring Tips
              </li>
              <li className="flex items-center gap-4 text-black text-[17px]">
                <MinusCircle className="w-6 h-6 text-[#173F7A]" />
                Pass Guarantee assistance (conditions apply)
              </li>
              <li className="flex items-center gap-4 text-black text-[17px]">
                <RefreshCcw className="w-6 h-6 text-[#173F7A]" />
                Personal call study overview with Kriscap
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[320px] mt-4 md:mt-0">
            <div className="bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col items-center">
              {/* Graphic Header */}
              <div className="w-full h-[120px] relative overflow-hidden bg-white">
                <div 
                   className="absolute top-0 w-[150%] h-[180px] -left-1/4 -mt-10"
                   style={{
                     background: "linear-gradient(135deg, #4A148C 0%, #009688 100%)",
                     borderBottomLeftRadius: "50%",
                     borderBottomRightRadius: "50%",
                   }}
                >
                </div>
                {/* A white curve overlapping */}
                <div 
                   className="absolute bottom-0 w-[150%] h-[60px] -left-1/4 bg-white"
                   style={{
                     borderTopLeftRadius: "50%",
                     borderTopRightRadius: "50%",
                   }}
                >
                </div>
                {/* A second thin colored curve */}
                <div 
                   className="absolute bottom-3 w-[120%] h-[30px] -left-[10%] bg-transparent border-t-4 border-[#009688]"
                   style={{
                     borderTopLeftRadius: "50%",
                     borderTopRightRadius: "50%",
                   }}
                >
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center px-6 pb-8 pt-2 w-full text-center bg-white z-10">
                <h3 className="text-[19px] font-bold text-black leading-snug mb-5">
                  One Time{"\n"}Call Guidance
                </h3>
                
                <div className="w-4/5 h-px bg-gray-200 mb-5"></div>
                
                <div className="text-[34px] font-extrabold tracking-tight text-black">
                  ₹480/-
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallGuidance;
