"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { curiosities } from "@/lib/data";
import { Reveal } from "./Reveal";

function Spark({ id }: { id: string }) {
  if (id === "q1") {
    return (
      <svg viewBox="0 0 200 80" className="h-16 w-40" aria-hidden>
        <rect x="20" y="10" width="160" height="60" fill="none" stroke="#1c1b19" strokeOpacity=".2" />
        <circle cx="70" cy="40" r="4" fill="#e85a1b" />
        <circle cx="110" cy="28" r="3" fill="#1c1b19" />
        <circle cx="140" cy="48" r="3" fill="#1c1b19" />
        <path d="M70 40 L110 28 L140 48" fill="none" stroke="#e85a1b" strokeOpacity=".6" />
      </svg>
    );
  }
  if (id === "q2") {
    return (
      <svg viewBox="0 0 200 80" className="h-16 w-40" aria-hidden>
        <path d="M20 55 C50 50,70 30,100 35 S150 50,180 25" fill="none" stroke="#1c1b19" />
        <path d="M100 35 C130 20,150 30,180 18" fill="none" stroke="#e85a1b" strokeDasharray="4 4" />
      </svg>
    );
  }
  if (id === "q3") {
    return (
      <svg viewBox="0 0 200 80" className="h-16 w-40" aria-hidden>
        <path d="M30 60 C70 60, 90 20, 170 20" fill="none" stroke="#e85a1b" />
        <circle cx="70" cy="48" r="3" fill="#1c1b19" />
        <circle cx="120" cy="28" r="3" fill="#1c1b19" />
      </svg>
    );
  }
  if (id === "q4") {
    return (
      <svg viewBox="0 0 200 80" className="h-16 w-40" aria-hidden>
        <path d="M30 60 C60 60,70 15,100 15 S140 60,170 60" fill="none" stroke="#1c1b19" />
        <ellipse cx="100" cy="40" rx="40" ry="18" fill="#e85a1b" fillOpacity=".12" stroke="#e85a1b" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 80" className="h-16 w-40" aria-hidden>
      <circle cx="60" cy="40" r="14" fill="none" stroke="#1c1b19" strokeOpacity=".3" />
      <circle cx="110" cy="40" r="14" fill="none" stroke="#e85a1b" />
      <path d="M74 40 H96" stroke="#e85a1b" />
      <text x="130" y="44" fontSize="9" fill="#8c857a" fontFamily="monospace">
        ∪
      </text>
    </svg>
  );
}

export default function Curiosity() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="curious" className="border-b border-[var(--line)]">
      <div className="section-pad mx-auto max-w-[1400px] py-24 md:py-32">
        <Reveal>
          <div className="mb-12 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] tracking-[0.28em] text-mandarin uppercase">
                05 — Research notebook
              </p>
              <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                Things I&apos;m{" "}
                <span className="serif-em">curious</span> about
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-warm-gray md:col-span-4 md:pt-10">
              Unfinished questions. Living experiments. I don&apos;t only work
              on assigned problems — I naturally generate questions.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-[var(--line)]">
          {curiosities.map((c, i) => {
            const open = hover === c.id;
            return (
              <Reveal key={c.id} delay={i * 0.04}>
                <article
                  className="group relative grid cursor-default grid-cols-1 border-b border-[var(--line)] py-7 transition-colors hover:bg-paper/70 md:grid-cols-12 md:gap-4"
                  onMouseEnter={() => setHover(c.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(c.id)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                >
                  <div className="flex items-start gap-4 md:col-span-1">
                    <span className="font-mono text-[11px] text-mandarin">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="max-w-2xl text-xl leading-snug tracking-tight md:text-2xl">
                      {c.question}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-warm-gray uppercase">
                      {c.hint}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-start md:col-span-4 md:mt-0 md:justify-end">
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Spark id={c.id} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
