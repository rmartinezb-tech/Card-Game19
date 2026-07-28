import { useEffect, useRef, useState } from "react";

// Drives a continuous `phase` value (in card units) via requestAnimationFrame.
// Cards physically travel their layout's circuit as phase advances. Each card
// spends `seconds` drifting through the focus window. Revealing pauses the motion
// so the user can grade; grading eases phase forward to the next card.
export default function useStudySession(cardCount) {
  const [seconds, setSeconds] = useState(8);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState(0);

  const phaseRef = useRef(0);
  const lastRef = useRef(0);
  const tweenRef = useRef(null);
  const revealedRef = useRef(false);
  revealedRef.current = revealed;

  useEffect(() => {
    phaseRef.current = 0;
    setPhase(0);
    setRevealed(false);
    tweenRef.current = null;
  }, [cardCount]);

  useEffect(() => {
    if (!cardCount) return;
    let raf;
    lastRef.current = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;
      if (tweenRef.current) {
        const tw = tweenRef.current;
        const p = Math.min(1, (now - tw.start) / tw.duration);
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        phaseRef.current = tw.from + (tw.to - tw.from) * e;
        if (p >= 1) tweenRef.current = null;
      } else if (!revealedRef.current) {
        phaseRef.current += dt / seconds;
      }
      const wrapped = ((phaseRef.current % cardCount) + cardCount) % cardCount;
      setPhase(wrapped);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cardCount, seconds]);

  const active = cardCount ? ((Math.round(phase) % cardCount) + cardCount) % cardCount : 0;
  const remaining = cardCount
    ? Math.max(0, Math.min(seconds, ((((active + 0.5 - phase) % cardCount) + cardCount) % cardCount) * seconds))
    : 0;

  const reveal = () => setRevealed(true);

  const grade = (known) => {
    setScore((v) => Math.max(0, v + (known ? 10 : -3)));
    setRevealed(false);
    const target = Math.floor(phaseRef.current) + 1;
    tweenRef.current = { from: phaseRef.current, to: target, start: performance.now(), duration: 1100 };
  };

  return { phase, active, remaining, revealed, seconds, score, setSeconds, reveal, grade };
}
