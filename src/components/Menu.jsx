import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import FoodCard from "./FoodCard";

const tabs=["All","Most Ordered","Plates","Sides","Drinks"];

export default function Menu({ items, addToCart }) {
  const [tab,setTab]=useState("All"); const [query,setQuery]=useState("");
  const filtered=useMemo(()=>items.filter(x=>(tab==="All"||x.category===tab)&&x.name.toLowerCase().includes(query.toLowerCase())),[items,tab,query]);
  return <section className="min-h-screen px-5 py-12 md:px-10 md:py-20">
    <div className="mx-auto max-w-7xl">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}>
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#dca34d]">11:00 AM – 2:15 PM</p>
        <h1 className="mt-2 font-display text-6xl font-bold tracking-tight md:text-8xl">The full menu.</h1>
        <p className="mt-5 max-w-2xl text-white/50">Plates, sides and drinks built for big appetites. Online ordering is available during lunch hours.</p>
      </motion.div>
      <div className="mt-10 flex flex-col gap-4 border-y border-white/8 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto">
          {tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${tab===x?"bg-[#f1b04a] text-[#1a120b]":"bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"}`}>{x}</button>)}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/40"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the menu" className="w-full bg-transparent outline-none placeholder:text-white/30 lg:w-52"/></label>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item,i)=><motion.div key={item.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.035}}><FoodCard item={item} onAdd={addToCart}/></motion.div>)}
      </div>
      {!filtered.length && <div className="py-24 text-center text-white/40"><SlidersHorizontal className="mx-auto mb-3 opacity-50"/>No dishes found.</div>}
    </div>
  </section>
}