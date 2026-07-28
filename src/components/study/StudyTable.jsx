import { motion } from "framer-motion";
import Flashcard from "@/components/study/Flashcard";
import { layoutPose } from "@/lib/cardLayouts";

export default function StudyTable({ cards, phase, active, layout, revealed, onReveal }) {
  const compact = typeof window !== "undefined" && window.innerWidth < 640;
  const breath = 1 + 0.06 * Math.sin((phase * Math.PI) / 3);
  return (
    <div className="felt-table relative min-h-[480px] flex-1 overflow-hidden sm:min-h-[570px]">
      <div className="pointer-events-none absolute inset-x-0 top-8 text-center"><p className="text-[10px] uppercase tracking-[.36em] text-white/35">{layout.replace("infinity", "infinity loop")}</p></div>
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {cards.map((card, index) => {
          const pose = layoutPose(layout, index, phase, cards.length, compact, breath);
          const isActive = index === active;
          return (
            <motion.div key={card.id} style={{ x: pose.x, y: pose.y, rotate: pose.rotate, scale: pose.scale, zIndex: pose.zIndex, opacity: pose.opacity }} className="absolute -left-[72px] -top-[98px] sm:-left-[88px] sm:-top-[119px]">
              <div className={isActive ? "active-card-glow animate-card-float" : ""}>
                <Flashcard card={card} active={isActive} revealed={revealed} onReveal={onReveal} />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[10px] uppercase tracking-[.24em] text-white/35">Follow the circuit · one card drifts into focus at a time</div>
    </div>
  );
}
