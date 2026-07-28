import { Circle, GalleryHorizontal, Rotate3D } from "lucide-react";

const choices = [
  ["circle", "Rotating Circle", Circle],
  ["conveyor", "Conveyor", GalleryHorizontal], ["infinity", "Infinity Loop", Rotate3D],
];
export default function LayoutPicker({ value, onChange }) {
  return <div className="flex gap-1 overflow-x-auto rounded-sm border border-white/20 bg-black/15 p-1">
    {choices.map(([id, label, Icon]) => <button key={id} onClick={() => onChange(id)} title={label} className={`flex shrink-0 items-center gap-1.5 rounded-sm px-2.5 py-2 text-xs transition ${value === id ? "bg-[#e4dfc8] text-[#1c281f] shadow-inner" : "text-white/75 hover:bg-white/10"}`}><Icon className="h-3.5 w-3.5"/><span className="hidden md:inline">{label}</span></button>)}
  </div>;
}
