import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Flashcard({ card, active, revealed, onReveal }) {
  return <button onClick={active ? onReveal : undefined} className="relative h-[196px] w-[144px] sm:h-[238px] sm:w-[176px] text-left [perspective:1200px]" aria-label={active ? "Reveal answer" : card.question}>
    <motion.div animate={{ rotateY: revealed && active ? 180 : 0 }} transition={{ duration: .9, ease: [.22,.61,.36,1] }} className="absolute inset-0 [transform-style:preserve-3d]">
      <div className="card-face bg-[#fffdf4] text-[#17241c]">
        <div className="flex items-center justify-between border-b border-[#d8d1b5] pb-2 text-[9px] uppercase tracking-[.2em] text-[#766c4c]"><span>{card.label || "Study card"}</span><span>◆</span></div>
        <p className="flex flex-1 items-center font-serif text-[15px] leading-relaxed sm:text-[18px]">{card.question}</p>
        <span className="text-[9px] uppercase tracking-[.18em] text-[#8c8264]">{active ? "Click to reveal" : "Waiting"}</span>
      </div>
      <div className="card-face bg-[#f8f1d8] text-[#183d2a] [transform:rotateY(180deg)]">
        <div className="flex items-center gap-2 border-b border-[#cfc39d] pb-2 text-[9px] uppercase tracking-[.2em]"><Sparkles className="h-3 w-3"/> Answer</div>
        <p className="flex flex-1 items-center font-serif text-[15px] leading-relaxed sm:text-[18px]">{card.answer}</p>
        <span className="text-[9px] uppercase tracking-[.18em] text-[#756c50]">Grade your recall</span>
      </div>
    </motion.div>
  </button>;
}
