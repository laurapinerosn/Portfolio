"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectVisual from "./ProjectVisual";
import { Reveal } from "./Reveal";

export default function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--line)]">
      <div className="section-pad mx-auto max-w-[1400px] py-24 md:py-32">
        <Reveal>
          <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.28em] text-mandarin uppercase">
                03 — Selected work
              </p>
              <h2 className="mt-3 text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
                Different questions.
                <br />
                <span className="serif-em text-charcoal-soft">
                  Different datasets.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-warm-gray md:col-span-4 md:col-start-9 md:text-right">
              One way of thinking.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10 md:gap-16">
          {projects.map((p, index) => (
            <Reveal key={p.id} delay={index * 0.04}>
              <Link
                href={p.href}
                className="group grid no-underline outline-none md:grid-cols-12 md:gap-8"
              >
                <div
                  className={`relative overflow-hidden border border-[var(--line)] bg-ivory-deep md:col-span-7 ${
                    index % 2 === 1 ? "md:col-start-6 md:order-2" : ""
                  }`}
                >
                  <div className="aspect-[16/9] transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <ProjectVisual kind={p.visual} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute top-0 left-0 h-full w-[3px] bg-mandarin" />
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-center border-t border-[var(--line)] pt-6 md:col-span-5 md:border-t-0 md:pt-0 ${
                    index % 2 === 1 ? "md:order-1 md:col-start-1" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm tracking-[0.2em] text-mandarin transition-transform duration-500 group-hover:-translate-y-1">
                      {p.number}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-warm-gray uppercase">
                      case study
                    </span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.75rem)] leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm font-serif text-lg text-charcoal-soft italic">
                    {p.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-[var(--line)] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-warm-gray uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-mandarin uppercase opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden
                  >
                    View case study →
                  </motion.span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
