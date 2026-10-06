import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function OrderPanel({ cart, updateQty, setPage }) {
  const [open,setOpen]=useState(false);
  useEffect(()=>{ const h=()=>setOpen(true); document.addEventListener("ironpot:order",h); return()=>document.removeEventListener("ironpot:order",h)},[]);
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  return <AnimatePresence>
    {open && <><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"/>
      <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:300,damping:30}} className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#1b140f] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/8 p-5"><div><p className="text-xs uppercase tracking-[.25em] text-[#dca34d]">Your order</p><h2 className="font-display text-2xl font-bold">Ready when you are.</h2></div><button onClick={()=>setOpen(false)} className="grid size-10 place-items-center rounded-full bg-white/5"><X size={18}/></button></div>
        <div className="flex-1 overflow-y-auto p-5">{!cart.length ? <div className="grid h-full place-items-center text-center text-white/35"><div><ShoppingBag size={38} className="mx-auto mb-4 opacity-40"/><p>Your bag is empty.</p><button onClick={()=>{setOpen(false);setPage("menu")}} className="mt-4 rounded-full bg-[#f1b04a] px-5 py-2.5 text-xs font-bold text-[#1a120b]">Browse menu</button></div></div> : <div className="space-y-3">{cart.map(x=><div key={x.id} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.03] p-3"><div className="size-16 shrink-0 overflow-hidden rounded-xl bg-[#33251b]">{x.image&&<img src={x.image} className="h-full w-full object-cover" alt=""/>}</div><div className="min-w-0 flex-1"><p className="font-semibold">{x.name}</p><p className="text-xs text-[#dca34d]">${(x.price*x.qty).toFixed(2)}</p></div><div className="flex items-center gap-2 rounded-full bg-white/5 p-1"><button onClick={()=>updateQty(x.id,-1)} className="grid size-7 place-items-center rounded-full hover:bg-white/10"><Minus size={13}/></button><span className="w-4 text-center text-xs">{x.qty}</span><button onClick={()=>updateQty(x.id,1)} className="grid size-7 place-items-center rounded-full hover:bg-white/10"><Plus size={13}/></button></div></div>)}</div>}</div>
        {cart.length>0&&<div className="border-t border-white/8 p-5"><div className="mb-4 flex justify-between text-sm"><span className="text-white/45">Subtotal</span><strong>${total.toFixed(2)}</strong></div><button onClick={()=>alert("Online checkout is ready to connect to your ordering provider.")} className="w-full rounded-2xl bg-[#f1b04a] py-4 text-sm font-bold text-[#1a120b] transition hover:bg-[#ffc76c]">Place order · ${total.toFixed(2)}</button><p className="mt-3 text-center text-[10px] text-white/30">Pickup · about 11 minutes</p></div>}
      </motion.aside>
    </>}
  </AnimatePresence>
}