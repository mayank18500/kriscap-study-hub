import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageCircleHeart } from "lucide-react";
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
    course: "Class 12 — Science",
    message: "I was completely lost before Kriscap. The TMA files were exactly what I needed—clear and precise. I scored 92%!",
    rating: 5,
    result: "Scored 92% in NIOS",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=4F46E5&color=fff&size=128",
    before: "Struggling student",
    after: "92% in Boards",
  },
  {
    id: 2,
    name: "Rahul Verma",
    course: "Class 10 — Commerce",
    message: "Files were handwritten exactly per NIOS guidelines. Teacher was impressed. The support team is amazing.",
    rating: 5,
    result: "First Division",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Verma&background=059669&color=fff&size=128",
    before: "Failed twice before",
    after: "First Division achieved",
  },
  {
    id: 3,
    name: "Ananya Patel",
    course: "Class 12 — Humanities",
    message: "Live classes helped me understand topics I couldn't grasp from books. Educators are super patient.",
    rating: 5,
    result: "85% in Boards",
    avatar: "https://ui-avatars.com/api/?name=Ananya+Patel&background=DC2626&color=fff&size=128",
    before: "Working, no time",
    after: "85% NIOS result",
  },
];

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);
  const story = STORIES[current];

  return (
    <section className="py-4 bg-gradient-to-b from-blue-50/50 to-slate-50 px-4 max-w-sm mx-auto overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <MessageCircleHeart className="w-5 h-5 text-blue-500" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">Student Comments</h2>
      </div>

      {/* Floating Cloud Container */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative z-10"
      >
        {/* Main Cloud Body */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-5 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] border border-white relative z-10">

          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* User Header */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={story.avatar} alt={story.name} className="w-10 h-10 rounded-full shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                  </div>
                </div>
                <div className="flex-1">
                  <span className="font-bold text-sm text-slate-900 block leading-none mb-1">{story.name}</span>
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md inline-block">
                    {story.course}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-slate-400 text-center">5.0</span>
                </div>
              </div>

              {/* The Comment */}
              <p className="text-sm leading-relaxed text-slate-700 font-medium px-1">
                "{story.message}"
              </p>

              {/* Verified Result (Embedded Reply) */}
              <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Result: {story.result}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-white p-2 rounded-xl shadow-sm border border-slate-50">
                  <div className="text-slate-500 truncate border-r border-slate-100 pr-2">
                    <span className="font-bold text-slate-400 uppercase text-[8px] tracking-wider block mb-0.5">Before</span>
                    {story.before}
                  </div>
                  <div className="text-slate-700 truncate font-semibold pl-1">
                    <span className="font-bold text-blue-400 uppercase text-[8px] tracking-wider block mb-0.5">After</span>
                    {story.after}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cloud Tail (Speech Bubble effect) */}
        <div className="absolute -bottom-3 left-12 w-8 h-8 bg-white transform rotate-45 rounded-sm shadow-[10px_10px_20px_-5px_rgba(37,99,235,0.1)] z-0" />
      </motion.div>

      {/* Pagination Controls (Outside the cloud) */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrent((c) => (c - 1 + STORIES.length) % STORIES.length)}
          className="w-8 h-8 rounded-full bg-white shadow-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1.5">
          {STORIES.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-5 bg-blue-500 shadow-sm shadow-blue-200" : "w-1.5 bg-slate-200"
                }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrent((c) => (c + 1) % STORIES.length)}
          className="w-8 h-8 rounded-full bg-white shadow-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}