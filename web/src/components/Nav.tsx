"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#thinking", label: "Thinking" },
  { href: "#curious", label: "Curious" },
  { href: "#connect", label: "Connect" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--ivory)_92%,transparent)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex max-w-[1400px] items-center justify-between py-4">
        <a href="#top" className="group flex items-baseline gap-2 no-underline">
          <span className="font-mono text-[10px] tracking-[0.22em] text-warm-gray uppercase">
            LP
          </span>
          <span className="text-sm font-medium tracking-tight text-charcoal group-hover:text-mandarin">
            {site.name}
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.18em] text-warm-gray uppercase no-underline transition-colors hover:text-mandarin"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#connect"
          className="font-mono text-[11px] tracking-[0.16em] text-mandarin uppercase no-underline"
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
