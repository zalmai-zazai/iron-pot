import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "motion/react";
import "./index.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import OrderPanel from "./components/OrderPanel";
import Footer from "./components/Footer";
import { MENU_ITEMS } from "./data";

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((current) => {
      const existing = current.find((x) => x.id === item.id);
      if (existing) return current.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...current, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((current) =>
      current.map((x) => x.id === id ? { ...x, qty: x.qty + delta } : x).filter((x) => x.qty > 0)
    );
  };

  useEffect(() => {
    const handler = () => setPage("menu");
    window.addEventListener("ironpot:menu", handler);
    return () => window.removeEventListener("ironpot:menu", handler);
  }, []);

  return (
    <div className="grain min-h-screen overflow-hidden bg-[#15110d]">
      <Header page={page} setPage={setPage} cartCount={cart.reduce((s, x) => s + x.qty, 0)} />
      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.main key="home" initial={{ opacity: 0, rotateY: -8, x: 60 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: 8, x: -60 }} transition={{ duration: .65, ease: [0.22,1,.36,1] }}>
            <Home setPage={setPage} addToCart={addToCart} />
          </motion.main>
        ) : (
          <motion.main key="menu" initial={{ opacity: 0, rotateY: 8, x: 60 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: -8, x: -60 }} transition={{ duration: .65, ease: [0.22,1,.36,1] }}>
            <Menu items={MENU_ITEMS} addToCart={addToCart} />
          </motion.main>
        )}
      </AnimatePresence>
      <OrderPanel cart={cart} updateQty={updateQty} setPage={setPage} />
      <Footer />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);