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
    <section className="py-2 bg-slate-50 dark:bg-slate-950 px-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <MessageCircleHeart className="w-5 h-5 text-blue-500" />
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">Student Reviews</h2>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative"
          >
            {/* User Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm md:text-base pr-24">
                    {story.name}
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline-block border-l border-slate-300 dark:border-slate-700 pl-2">
                      {story.course}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium sm:hidden">
                {story.course}
              </span>
            </div>

            {/* The Comment */}
            <p className="text-slate-700 dark:text-slate-300 mb-2 text-sm md:text-base leading-relaxed">
              "{story.message}"
            </p>

            {/* NIOS Result Badge */}
            <div className="absolute top-4 right-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {story.result}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrent((c) => (c - 1 + STORIES.length) % STORIES.length)}
            className="w-10 h-10 rounded-full border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {STORIES.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${idx === current
                  ? "w-8 bg-blue-600 dark:bg-blue-500"
                  : "w-2 bg-slate-300 dark:bg-slate-700"
                  }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrent((c) => (c + 1) % STORIES.length)}
            className="w-10 h-10 rounded-full border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}