import { site } from "@/lib/data";
import { Reveal } from "./Reveal";

export default function Footer() {
  return (
    <footer id="connect" className="bg-charcoal text-ivory">
      <div className="section-pad mx-auto max-w-[1400px] py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.28em] text-mandarin-soft uppercase">
            07 — Next
          </p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
            Let&apos;s build something{" "}
            <span className="serif-em text-mandarin-soft">interesting.</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-soft-gray">
            Data, mathematics, curiosity — and a good question.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-8 border-t border-white/15 pt-10">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] tracking-[0.18em] text-ivory uppercase no-underline hover:text-mandarin-soft"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] tracking-[0.18em] text-ivory uppercase no-underline hover:text-mandarin-soft"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-[12px] tracking-[0.18em] text-ivory uppercase no-underline hover:text-mandarin-soft"
            >
              Email
            </a>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-soft-gray md:flex-row">
          <p className="font-mono tracking-[0.12em] uppercase">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono tracking-[0.12em] uppercase">
            Bogotá · Remote LATAM
          </p>
        </div>
      </div>
    </footer>
  );
}
