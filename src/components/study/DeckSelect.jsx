import { ChevronDown, Layers3 } from "lucide-react";

export default function DeckSelect({ decks, value, onChange }) {
  return <label className="relative flex items-center gap-2 text-xs text-white/80"><Layers3 className="h-4 w-4"/><select value={value} onChange={e => onChange(e.target.value)} className="appearance-none rounded-sm border border-white/25 bg-[#174d31] py-2 pl-3 pr-9 font-medium text-white outline-none focus:ring-1 focus:ring-[#f4dc83]">{decks.map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5"/></label>;
}
