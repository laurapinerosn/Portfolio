import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/data";
import ProjectVisual from "@/components/ProjectVisual";
import Nav from "@/components/Nav";

type Props = { params: Promise<{ slug: string }> };

const bySlug: Record<string, (typeof projects)[number]> = {
  "scoutmetrics-football": projects[0],
  "msc-pv-load-curves": projects[1],
  "d2b-meridian-mmm": projects[2],
  "caracol-ditu-crossmedia": projects[3],
  "nae-claro-banking": projects[4],
};

export function generateStaticParams() {
  return Object.keys(bySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = bySlug[slug];
  if (!project) return { title: "Case study" };
  return {
    title: `${project.title} — Laura Piñeros`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = bySlug[slug];
  if (!project) notFound();

  const notebookMap: Record<string, string> = {
    "scoutmetrics-football": "notebooks/05_scoutmetrics_football.ipynb",
    "msc-pv-load-curves": "notebooks/04_msc_pv_load_curves.ipynb",
    "d2b-meridian-mmm": "notebooks/02_d2b_meridian_mmm.ipynb",
    "caracol-ditu-crossmedia": "notebooks/01_caracol_ditu_crossmedia.ipynb",
    "nae-claro-banking": "notebooks/03_nae_claro_banking.ipynb",
  };

  const notebookUrl = `${site.github}/blob/main/${notebookMap[slug]}`;

  return (
    <>
      <Nav />
      <main className="pt-24">
        <article className="section-pad mx-auto max-w-[1100px] pb-24">
          <p className="font-mono text-[11px] tracking-[0.24em] text-mandarin uppercase">
            {project.number} — Case study
          </p>
          <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-2xl text-charcoal-soft italic">
            {project.tagline}
          </p>

          <div className="mt-10 overflow-hidden border border-[var(--line)]">
            <div className="aspect-[16/8]">
              <ProjectVisual kind={project.visual} />
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="font-mono text-[11px] tracking-[0.2em] text-warm-gray uppercase">
                Framing
              </h2>
              <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
                This case study lives as a reproducible notebook — a place where
                the question, the structure, and the insight can be inspected
                together. Open it on GitHub, then bring it into Jupyter, VS
                Code, or Colab.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <h2 className="font-mono text-[11px] tracking-[0.2em] text-warm-gray uppercase">
                Open
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={notebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex bg-charcoal px-4 py-3 font-mono text-[11px] tracking-[0.16em] text-ivory uppercase no-underline hover:bg-mandarin"
                >
                  View notebook on GitHub
                </a>
                <Link
                  href="/#work"
                  className="font-mono text-[11px] tracking-[0.16em] text-warm-gray uppercase no-underline hover:text-mandarin"
                >
                  ← All selected work
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
