import { Rocket, Eye, Code2, Target, Layers, Workflow } from 'lucide-react';

const REASONS = [
  {
    icon: Rocket,
    title: 'Production-minded AI',
    text: 'I design AI systems for real environments — reliable pipelines, clear decisions and code that can be maintained beyond a demo.',
  },
  {
    icon: Eye,
    title: 'Strong Computer Vision experience',
    text: 'Hands-on work with detection, tracking, OCR, segmentation and industrial vision workflows at Thingtrax and in personal projects.',
  },
  {
    icon: Layers,
    title: 'End-to-end AI development',
    text: 'From model choice and pipeline design to APIs and product integration — one coherent build across the full stack.',
  },
  {
    icon: Code2,
    title: 'Clean, maintainable code',
    text: 'Readable structure, practical abstractions and documentation so teams can extend the system without rewriting it.',
  },
  {
    icon: Target,
    title: 'Business-focused problem solving',
    text: 'I start from the operational problem, then choose the right vision or ML approach — not the other way around.',
  },
  {
    icon: Workflow,
    title: 'Practical intelligent systems',
    text: 'Detection, tracking, OCR and GenAI are tools. The goal is a working system that improves a real workflow.',
  },
];

export function WhyMe() {
  return (
    <section id="why-me" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-60" />
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="reveal eyebrow justify-center">
            <span className="h-px w-6 bg-brand-500" /> Why Work With Me
          </span>
          <h2 className="reveal section-title mt-3">A partner who ships AI that works</h2>
          <p className="reveal mt-4 text-ink-600 dark:text-ink-300">
            Production-minded Computer Vision and AI development focused on clear outcomes, not hype.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="reveal group glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-600 transition-colors group-hover:from-brand-500 group-hover:to-accent-500 group-hover:text-white dark:text-brand-400">
                <r.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
