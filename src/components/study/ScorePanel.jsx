import { Award } from "lucide-react";

export default function ScorePanel({ score, position, total, remaining }) {
  return <div className="flex items-center gap-4 text-xs text-white/75"><span className="hidden sm:inline">Card {position} of {total}</span><span className="flex items-center gap-1.5 font-semibold text-[#f6df88]"><Award className="h-4 w-4"/>{score} pts</span><span className="min-w-8 rounded-sm bg-black/20 px-2 py-1 text-center font-mono text-white">{Math.ceil(remaining)}s</span></div>;
}
