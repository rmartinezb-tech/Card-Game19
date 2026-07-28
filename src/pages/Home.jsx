import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { store } from "@/lib/store";
import WindowFrame from "@/components/study/WindowFrame";
import DeckSelect from "@/components/study/DeckSelect";
import LayoutPicker from "@/components/study/LayoutPicker";
import ScorePanel from "@/components/study/ScorePanel";
import StudyTable from "@/components/study/StudyTable";
import StudyControls from "@/components/study/StudyControls";
import useStudySession from "@/hooks/useStudySession";

export default function Home() {
  const { data: decks = [] } = useQuery({ queryKey:["decks"], queryFn:() => store.entities.Deck.list("created_date") });
  const [deckId, setDeckId] = useState(""), [layout, setLayout] = useState("circle");
  useEffect(() => { if (!deckId && decks[0]) setDeckId(decks[0].id); }, [decks, deckId]);
  const { data: cards = [], isLoading } = useQuery({ queryKey:["cards", deckId], queryFn:() => store.entities.Flashcard.filter({ deck_id:deckId }, "created_date"), enabled:!!deckId });
  const study = useStudySession(cards.length);
  return <WindowFrame>
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/40 bg-[#0c633b] px-3 py-2"><DeckSelect decks={decks} value={deckId} onChange={setDeckId}/><ScorePanel score={study.score} position={cards.length ? study.active + 1 : 0} total={cards.length} remaining={study.remaining}/></div>
    <div className="border-b border-black/30 bg-[#084d2d] p-2"><LayoutPicker value={layout} onChange={setLayout}/></div>
    {isLoading ? <div className="felt-table grid flex-1 place-items-center text-sm text-white/60">Dealing your cards…</div> : cards.length ? <StudyTable cards={cards} phase={study.phase} active={study.active} layout={layout} revealed={study.revealed} onReveal={study.reveal}/> : <div className="felt-table grid flex-1 place-items-center text-sm text-white/60">This deck has no cards yet.</div>}
    <footer className="border-t border-white/15 bg-[#073f27] px-3 py-3"><StudyControls revealed={study.revealed} seconds={study.seconds} onSeconds={study.setSeconds} onReveal={study.reveal} onGrade={study.grade}/></footer>
  </WindowFrame>;
}
