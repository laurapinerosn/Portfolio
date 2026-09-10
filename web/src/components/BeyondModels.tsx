import { Reveal } from "./Reveal";

export default function BeyondModels() {
  return (
    <section
      id="about"
      className="relative border-b border-[var(--line)] bg-paper"
    >
      <div className="section-pad mx-auto max-w-[1400px] py-24 md:py-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] text-mandarin uppercase">
                02 — Beyond the models
              </p>
              <h2 className="mt-3 max-w-md text-3xl tracking-tight md:text-4xl">
                The person behind the{" "}
                <span className="serif-em">technical skills</span>
              </h2>
            </div>
            <p className="hidden max-w-[16ch] text-right font-mono text-[10px] leading-relaxed tracking-[0.12em] text-warm-gray uppercase md:block">
              Not a LinkedIn about.
              <br />A field note.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="relative max-w-4xl border-l-2 border-mandarin pl-6 md:pl-10">
            <p className="font-serif text-[clamp(1.75rem,4.2vw,3.35rem)] leading-[1.15] text-charcoal italic">
              “I don&apos;t want to be defined only by what I know. I want to be
              remembered for the questions I asked and the ideas I brought to
              the table.”
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-2">
              <p className="text-[15px] leading-relaxed text-charcoal-soft md:text-base">
                I&apos;m a mathematician by training, but curiosity is probably
                what defines me best.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-[15px] leading-relaxed text-warm-gray md:text-base">
                I enjoy understanding how things work, finding patterns where
                they are not obvious, and asking questions that sometimes lead
                somewhere completely unexpected.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-warm-gray md:text-base">
                Data science gave me a way to combine mathematics, technology,
                business, problem solving and ideas.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
