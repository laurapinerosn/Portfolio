"use client";

import { motion, useReducedMotion } from "framer-motion";
import ThinkingCanvas from "./ThinkingCanvas";
import { site } from "@/lib/data";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-[var(--line)]"
    >
      <div className="editorial-grid absolute inset-0 opacity-70" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-full md:w-[52%]" aria-hidden>
        <div className="relative h-full w-full border-l border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_70%,transparent)]">
          <ThinkingCanvas />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ivory via-transparent to-transparent md:from-transparent" />
        </div>
      </div>

      <div className="section-pad relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 font-mono text-[11px] tracking-[0.28em] text-warm-gray uppercase"
        >
          <span className="accent-dot mr-2 align-middle" />
          Data × Mathematics × Curiosity × Ideas
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[14ch] text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.04em] text-charcoal"
        >
          {site.name.split(" ")[0]}{" "}
          <span className="serif-em text-charcoal-soft">
            {site.name.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-5 font-mono text-[12px] tracking-[0.14em] text-warm-gray uppercase"
        >
          {site.title}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-10 max-w-xl text-[clamp(1.35rem,2.6vw,2rem)] leading-snug text-charcoal"
        >
          I like finding the{" "}
          <span className="serif-em text-mandarin">simple idea</span> inside
          complex problems.
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="mt-5 max-w-lg text-[15px] leading-relaxed text-warm-gray md:text-base"
        >
          I work with data, mathematics and business to understand what is
          happening, why it happens, and what we can do next.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="inline-flex items-center bg-charcoal px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-ivory uppercase no-underline transition hover:bg-mandarin"
          >
            Explore my work
          </a>
          <a
            href="#connect"
            className="inline-flex items-center border border-charcoal/20 px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-charcoal uppercase no-underline transition hover:border-mandarin hover:text-mandarin"
          >
            Let&apos;s connect
          </a>
        </motion.div>

        <p className="mt-16 hidden font-mono text-[10px] tracking-[0.2em] text-warm-gray uppercase md:block">
          fig.01 — data becoming an idea
        </p>
      </div>
    </section>
  );
}
