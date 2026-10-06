import { Plus } from "lucide-react";
import { motion } from "motion/react";

export default function FoodCard({ item, onAdd, compact=false }) {
  return <motion.article whileHover={{ rotateX: 5, rotateY: -5, y:-5 }} transition={{ type:"spring", stiffness:280, damping:18 }} className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#241a13] shadow-xl shadow-black/20 [transform-style:preserve-3d] ${compact ? "w-full" : ""}`}>
    <div className={`relative overflow-hidden bg-[#33251b] ${compact ? "h-44" : "aspect-[1.08]"}`}>
      {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy"/> : <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#6b4325,#2b1d15_62%)]"><span className="font-display text-5xl font-bold text-[#eab05a]/30">IP</span></div>}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d140f]/80 via-transparent to-transparent"/>
      {item.liked && <span className="absolute left-3 top-3 rounded-full bg-[#f1b34e] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#1b120a]">{item.liked}</span>}
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2"><div><h3 className="font-display text-xl font-bold">{item.name}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-white/45">{item.description}</p></div><span className="shrink-0 text-sm font-bold text-[#f1b04a]">${item.price.toFixed(2)}</span></div>
      <button onClick={() => onAdd(item)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/5 py-2.5 text-xs font-bold text-white/70 transition hover:border-[#e9a842]/30 hover:bg-[#e9a842]/10 hover:text-[#f5c16d]"><Plus size={14}/> Add to order</button>
    </div>
  </motion.article>
}