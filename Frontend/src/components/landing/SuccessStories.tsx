import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Story {
  id: number;
  name: string;
  course: string;
  message: string;
  rating: number;
  result: string;
  avatar: string;
  before: string;
  after: string;
}

const STORIES: Story[] = [
  {
    id: 1,
    name: "Priya Sharma",
    course: "NIOS Class 12 — Science",
    message:
      "I was completely lost before I found Kriscap. The TMA files were exactly what I needed — clear, precise, and exam-ready. I scored 92% in my board exams!",
    rating: 5,
    result: "Scored 92% in NIOS Board Exams",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=4F46E5&color=fff&size=128",
    before: "Struggling student, no direction",
    after: "92% in NIOS Boards, pursuing B.Sc.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    course: "NIOS Class 10 — Commerce",
    message:
      "The project files delivered to my home were handwritten and exactly as per the NIOS guidelines. My teacher was impressed. The support team guided me at every step.",
    rating: 5,
    result: "First Division — Class 10 NIOS",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Verma&background=059669&color=fff&size=128",
    before: "Failed twice in regular school",
    after: "First Division, started college",
  },
  {
    id: 3,
    name: "Ananya Patel",
    course: "NIOS Class 12 — Humanities",
    message:
      "The live classes helped me understand topics I could never grasp from books. The educators are patient and the study materials are top-notch. Highly recommend!",
    rating: 5,
    result: "85% in NIOS Board — Humanities",
    avatar: "https://ui-avatars.com/api/?name=Ananya+Patel&background=DC2626&color=fff&size=128",
    before: "Working student, no time to study",
    after: "85% NIOS result, pursuing B.A.",
  },
  {
    id: 4,
    name: "Mohammed Khan",
    course: "NIOS Class 12 — Business Studies",
    message:
      "I purchased the complete subject bundle and it covered everything. The instant download feature is amazing — I got all files within minutes of payment.",
    rating: 5,
    result: "Passed with Distinction",
    avatar: "https://ui-avatars.com/api/?name=Mohammed+Khan&background=D97706&color=fff&size=128",
    before: "No study materials, low confidence",
    after: "Distinction in NIOS, started business",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + STORIES.length) % STORIES.length);
  const next = () => setCurrent((c) => (c + 1) % STORIES.length);

  const story = STORIES[current];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="w-full px-6 md:px-12 max-w-none">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Student Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0b1f3c] mb-4">
            Real Students,{" "}
            <span className="text-[#2563EB]">Real Results</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            These are real stories from students who transformed their academic journey with Kriscap Study Hub.
          </p>
        </div>

        {/* Story Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left — Story */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <Quote className="w-10 h-10 text-blue-100 mb-6" />
                    <p className="text-slate-700 text-lg leading-relaxed font-medium mb-8">
                      "{story.message}"
                    </p>
                    <StarRating count={story.rating} />
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{story.name}</p>
                      <p className="text-slate-500 text-sm">{story.course}</p>
                    </div>
                  </div>
                </div>

                {/* Right — Before/After */}
                <div className="bg-gradient-to-br from-[#0b1f3c] to-[#1e3a5f] p-8 md:p-12 flex flex-col justify-center gap-6">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 text-lg font-black">✓</span>
                    </span>
                    <span className="text-green-400 font-bold text-sm uppercase tracking-widest">
                      Result
                    </span>
                  </div>
                  <p className="text-2xl font-black text-white">{story.result}</p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                      <p className="text-red-400 text-xs font-bold uppercase mb-2">Before</p>
                      <p className="text-slate-300 text-sm">{story.before}</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                      <p className="text-green-400 text-xs font-bold uppercase mb-2">After</p>
                      <p className="text-slate-300 text-sm">{story.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-slate-200 hover:bg-slate-50 w-11 h-11"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {STORIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === current ? "w-8 h-2.5 bg-[#2563EB]" : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-slate-200 hover:bg-slate-50 w-11 h-11"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
