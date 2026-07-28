import { Minus, Square, X } from "lucide-react";

export default function WindowFrame({ children }) {
  return <main className="min-h-screen bg-[#123e29] p-0 sm:p-4 lg:p-7"><section className="mx-auto flex min-h-screen max-w-[1440px] flex-col overflow-hidden border-[#d9d5c4] bg-[#0b5c36] shadow-2xl sm:min-h-[calc(100vh-2rem)] sm:border-2 sm:border-r-[#4b4a43] sm:border-b-[#4b4a43]">
    <header className="flex h-8 shrink-0 items-center justify-between bg-gradient-to-r from-[#082b73] via-[#0b4ca1] to-[#4d91cd] px-2 text-xs font-bold text-white"><span>◆ Study Solitaire</span><div className="flex gap-1">{[Minus, Square, X].map((Icon,i)=><span key={i} className="grid h-5 w-5 place-items-center border border-white/70 bg-[#d8d6ca] text-[#152c56] shadow-inner"><Icon className="h-3 w-3"/></span>)}</div></header>
    {children}
  </section></main>;
}
