import { Check, RotateCcw, Timer, X } from "lucide-react";

export default function StudyControls({ revealed, seconds, onSeconds, onReveal, onGrade }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">
    <div className="mr-2 flex items-center gap-2 rounded-sm border border-white/20 bg-black/15 px-3 py-2 text-xs text-white/80"><Timer className="h-4 w-4"/><input aria-label="Thinking time" type="range" min="5" max="15" value={seconds} onChange={e => onSeconds(Number(e.target.value))} className="w-20 accent-[#e9d889]"/><span>{seconds}s</span></div>
    {!revealed ? <button onClick={onReveal} className="classic-button px-5"><RotateCcw className="h-4 w-4"/>Reveal answer</button> : <>
      <button onClick={() => onGrade(false)} className="classic-button px-4 text-[#6b241e]"><X className="h-4 w-4"/>Again</button>
      <button onClick={() => onGrade(true)} className="classic-button px-5 text-[#153c23]"><Check className="h-4 w-4"/>I knew it</button>
    </>}
  </div>;
}
