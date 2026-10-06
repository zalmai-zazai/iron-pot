import {
  ArrowDown,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { MENU_ITEMS } from "../data";
import FoodCard from "./FoodCard";

function HeroRing({ addToCart }) {
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 80, damping: 20 });
  const sy = useSpring(py, { stiffness: 80, damping: 20 });

  const rx = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const ry = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const featured = MENU_ITEMS.filter(
    (x) =>
      x.featured ||
      ["poke", "kalbi", "yakisoba", "chicken-katsu"].includes(x.id),
  );

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;

      const r = ref.current.getBoundingClientRect();

      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };

    window.addEventListener("pointermove", move);

    return () => {
      window.removeEventListener("pointermove", move);
    };
  }, [px, py]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rx,
        rotateY: ry,
      }}
      className="relative mx-auto h-[430px] w-[min(92vw,650px)] [perspective:1000px]"
    >
      {/* Soft orbit */}
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f1b04a]/10 shadow-[0_0_100px_rgba(224,150,45,0.08)]" />

      {/* Rotating food plates */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        {featured.map((item, i) => {
          const angle = (i / featured.length) * 360;

          return (
            <motion.div
              key={item.id}
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(-145px)
                  rotate(${-angle}deg)
                `,
              }}
              className="absolute left-1/2 top-1/2 -ml-14 -mt-14"
            >
              <motion.button
                type="button"
                onClick={() => addToCart(item)}
                whileHover={{
                  scale: 1.15,
                  y: -6,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="
                  relative
                  h-28
                  w-28
                  rounded-full
                  border-[7px]
                  border-[#f7eee2]
                  bg-[#fffaf1]
                  shadow-[0_18px_35px_rgba(0,0,0,0.38)]
                  transition-shadow
                  hover:shadow-[0_22px_45px_rgba(0,0,0,0.5)]
                  [transform-style:preserve-3d]
                "
                aria-label={`Add ${item.name}`}
              >
                {/* Plate */}
                <span
                  className="
                    absolute
                    inset-[5px]
                    overflow-hidden
                    rounded-full
                    border
                    border-[#d9c6ae]
                    bg-[#d7b589]
                  "
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        scale-[1.12]
                      "
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="
                        grid
                        h-full
                        w-full
                        place-items-center
                        bg-gradient-to-br
                        from-[#d9944a]
                        to-[#70351e]
                      "
                    >
                      <span className="font-display text-2xl font-bold text-white/70">
                        IP
                      </span>
                    </span>
                  )}
                </span>

                {/* Plate highlight */}
                <span className="pointer-events-none absolute inset-1 rounded-full border border-white/70 opacity-60" />

                {/* Small food name */}
                <span
                  className="
                    absolute
                    -bottom-6
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white/55
                  "
                >
                  {item.name}
                </span>
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center plate / Iron Pot logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            mx-auto
            grid
            size-32
            place-items-center
            rounded-full
            border-[6px]
            border-[#f5eadb]
            bg-[#fffaf1]
            shadow-[0_25px_60px_rgba(0,0,0,0.42)]
          "
        >
          <div
            className="
              grid
              size-24
              place-items-center
              rounded-full
              border
              border-[#dfc6a3]
              bg-[#f7ead7]
            "
          >
            <div className="text-center">
              <span className="font-display text-3xl font-bold text-[#8b4b25]">
                IP
              </span>

              <span className="mt-1 block text-[7px] font-bold uppercase tracking-[0.28em] text-[#8b4b25]/60">
                Iron Pot
              </span>
            </div>
          </div>
        </motion.div>

        <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
          Korean · Asian · Comfort
        </p>
      </div>
    </motion.div>
  );
}

export default function Home({ setPage, addToCart }) {
  return (
    <div>
      <section className="relative min-h-[calc(100vh-73px)] overflow-hidden px-5 pb-16 pt-12 md:px-10 md:pt-20">
        <div className="pointer-events-none absolute -left-40 top-0 size-[500px] rounded-full bg-[#9c4b20]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-180px] top-20 size-[520px] rounded-full bg-[#e5a638]/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-2 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e7a842]/20 bg-[#e7a842]/8 px-4 py-2 text-xs font-semibold text-[#f1bd68]">
              <span className="size-1.5 rounded-full bg-[#e7a842] shadow-[0_0_12px_#e7a842]" />{" "}
              Open for pickup · 11:00 AM – 2:15 PM
            </div>
            <h1 className="font-display text-6xl font-bold leading-[.9] tracking-[-.045em] text-shadow md:text-8xl">
              Big flavor.
              <br />
              <span className="text-[#eab05a]">Iron</span> heart.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/55 md:text-lg">
              Korean and Asian comfort food made for hungry days. Grab your
              favorites in the heart of Kent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setPage("menu")}
                className="group flex items-center gap-3 rounded-full bg-[#f2b24e] px-6 py-3.5 text-sm font-bold text-[#1a120b] transition hover:bg-[#ffc76c]"
              >
                Explore full menu{" "}
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </button>
              <a
                href="https://www.google.com/maps/place/Iron+pot/@47.3802727,-122.2333782,15z"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm font-semibold text-white/75 hover:bg-white/5"
              >
                <MapPin size={16} /> Directions
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-5 text-xs text-white/45">
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-[#eab05a]" /> Ready in about 11
                min
              </span>
              <span className="flex items-center gap-2">
                <Star size={14} className="text-[#eab05a] fill-current" /> Local
                favorite
              </span>
            </div>
          </motion.div>
          <HeroRing addToCart={addToCart} />
        </div>
        <div className="mx-auto mt-4 flex max-w-7xl items-center justify-center gap-2 text-[10px] uppercase tracking-[.3em] text-white/25">
          <ArrowDown size={13} /> Scroll to featured
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#1a1410] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.3em] text-[#dca34d]">
                Crowd favorites
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Featured from the pot
              </h2>
            </div>
            <button
              onClick={() => setPage("menu")}
              className="hidden items-center gap-2 text-sm font-semibold text-white/55 hover:text-white md:flex"
            >
              See all <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MENU_ITEMS.filter((x) => x.featured || x.liked)
              .slice(0, 4)
              .map((item) => (
                <FoodCard key={item.id} item={item} onAdd={addToCart} />
              ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-white/8 bg-gradient-to-br from-[#271c14] to-[#17110d] p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[.3em] text-[#dca34d]">
              Find us
            </p>
            <h2 className="font-display text-4xl font-bold">
              Come hungry.
              <br />
              Leave happy.
            </h2>
            <p className="mt-4 max-w-xl text-white/50">
              222 1st Avenue South, Kent, WA 98032
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end md:justify-center">
            <a
              href="tel:2532774905"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/5"
            >
              <Phone size={15} /> (253) 277-4905
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/maps/place/Iron+pot/@47.3802727,-122.2333782,15z"
              className="flex items-center justify-center gap-2 rounded-full bg-[#f2b24e] px-5 py-3 text-sm font-bold text-[#1a120b]"
            >
              <MapPin size={15} /> Open in Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
