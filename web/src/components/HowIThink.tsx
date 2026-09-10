"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { principles } from "@/lib/data";
import { Reveal } from "./Reveal";

function MiniDiagram({ index, active }: { index: number; active: boolean }) {
  const stroke = active ? "#e85a1b" : "rgba(28,27,25,0.35)";
  if (index === 0) {
    return (
      <svg viewBox="0 0 120 64" className="h-14 w-28" aria-hidden>
        <circle cx="28" cy="32" r="10" fill="none" stroke={stroke} />
        <path d="M42 32 H88" stroke={stroke} strokeDasharray="3 4" />
        <circle cx="98" cy="32" r="6" fill={active ? "#e85a1b" : "#1c1b19"} />
        <text x="8" y="14" fontSize="8" fill="#8c857a" fontFamily="monospace">
          ? → Q
        </text>
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 120 64" className="h-14 w-28" aria-hidden>
        <circle cx="30" cy="22" r="7" fill={stroke} fillOpacity="0.2" stroke={stroke} />
        <circle cx="90" cy="22" r="7" fill={stroke} fillOpacity="0.2" stroke={stroke} />
        <circle cx="60" cy="48" r="8" fill={active ? "#e85a1b" : "#1c1b19"} />
        <path d="M36 26 L54 42 M84 26 L66 42" stroke={stroke} />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 120 64" className="h-14 w-28" aria-hidden>
        <path
          d="M10 50 C 30 10, 50 55, 70 20 S 100 45, 112 28"
          fill="none"
          stroke="rgba(28,27,25,0.2)"
          strokeWidth="3"
        />
        <path
          d="M14 44 L110 30"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 64" className="h-14 w-28" aria-hidden>
      <rect x="18" y="18" width="28" height="28" fill="none" stroke={stroke} />
      <path d="M52 32 H74" stroke={stroke} />
      <polygon points="86,18 110,32 86,46" fill={active ? "#e85a1b" : "#1c1b19"} />
    </svg>
  );
}

export default function HowIThink() {
  const [active, setActive] = useState(0);

  return (
    <section id="thinking" className="border-b border-[var(--line)] bg-ivory-deep/40">
      <div className="section-pad mx-auto max-w-[1400px] py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.28em] text-mandarin uppercase">
            04 — How I think
          </p>
          <h2 className="mt-3 max-w-2xl text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
            Four principles.
            <span className="serif-em"> One temperament.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-5">
            {principles.map((p, i) => {
              const isActive = active === i;
              return (
                <button
                  key={p.number}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex items-start gap-4 border px-4 py-4 text-left transition-colors ${
                    isActive
                      ? "border-mandarin bg-paper"
                      : "border-transparent hover:border-[var(--line)]"
                  }`}
                >
                  <span
                    className={`font-mono text-xs tracking-[0.2em] ${
                      isActive ? "text-mandarin" : "text-warm-gray"
                    }`}
                  >
                    {p.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl tracking-tight uppercase md:text-2xl">
                        {p.title}
                      </h3>
                      <MiniDiagram index={i} active={isActive} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[220px] border border-[var(--line)] bg-paper p-8 md:col-span-6 md:col-start-7 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-[10px] tracking-[0.22em] text-warm-gray uppercase">
                  principle {principles[active].number}
                </p>
                <p className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-snug text-charcoal italic">
                  {principles[active].body}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute right-6 bottom-6 font-mono text-[10px] text-soft-gray">
              [{active + 1}/4]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
