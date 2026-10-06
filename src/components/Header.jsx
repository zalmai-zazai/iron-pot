import { MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

export default function Header({ page, setPage, cartCount }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#15110d]/85 px-5 py-4 backdrop-blur-xl md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <button onClick={() => setPage("home")} className="group flex items-center gap-3 text-left">
          <span className="grid size-10 place-items-center rounded-full bg-[#e8a23a] text-[#1a120b] shadow-lg shadow-orange-950/20">
            <UtensilsCrossed size={19} strokeWidth={2.5} />
          </span>
          <span>
            <span className="font-display block text-xl font-bold leading-none tracking-tight">IRON POT</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.28em] text-[#d4b99a]">Kent · Washington</span>
          </span>
        </button>
        <nav className="hidden items-center gap-2 md:flex">
          <button onClick={() => setPage("home")} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${page==="home" ? "bg-white/10 text-white" : "text-white/55 hover:text-white"}`}>Home</button>
          <button onClick={() => setPage("menu")} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${page==="menu" ? "bg-white/10 text-white" : "text-white/55 hover:text-white"}`}>Full Menu</button>
          <a href="tel:2532774905" className="ml-2 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/65 hover:border-white/25 hover:text-white"><MapPin size={15}/> (253) 277-4905</a>
        </nav>
        <motion.button whileTap={{ scale:.94 }} onClick={() => document.dispatchEvent(new CustomEvent("ironpot:order"))} className="relative grid size-11 place-items-center rounded-full bg-[#f4b44d] text-[#1a120b] shadow-lg shadow-orange-950/30">
          <ShoppingBag size={20}/>
          {cartCount > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 h-5 place-items-center rounded-full bg-[#e95f35] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
        </motion.button>
      </div>
    </header>
  );
}