"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Reveal } from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-[var(--line)] bg-paper">
      <div className="section-pad mx-auto max-w-[1400px] py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.28em] text-mandarin uppercase">
            06 — Instruments
          </p>
          <h2 className="mt-3 max-w-xl text-[clamp(2rem,4vw,3.2rem)] tracking-[-0.03em]">
            Not a wall of logos.
            <span className="serif-em"> A set of languages.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.06}>
              <div className="border border-[var(--line)] p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-mono text-[11px] tracking-[0.22em] text-charcoal uppercase">
                    {g.title}
                  </h3>
                  <span className="accent-dot" />
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + ii * 0.04, duration: 0.4 }}
                      className="border border-[var(--line)] bg-ivory px-3 py-2 text-sm text-charcoal-soft"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
