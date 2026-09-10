import { experiences } from '../data/portfolio';
import { Briefcase, Calendar } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-50" />
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="reveal eyebrow justify-center">
            <span className="h-px w-6 bg-brand-500" /> Experience
          </span>
          <h2 className="reveal section-title mt-3">Where I've built AI in the real world</h2>
          <p className="reveal mt-4 text-ink-600 dark:text-ink-300">
            Industrial Computer Vision at Thingtrax, plus earlier data science work building practical ML models.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <ol className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-brand-500 before:via-brand-400/50 before:to-transparent sm:before:left-[23px]">
            {experiences.map((exp) => (
              <li key={exp.company} className="reveal relative pl-14 sm:pl-16">
                <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow sm:h-12 sm:w-12">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div className="glass-card p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{exp.company}</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                      <Calendar className="h-3.5 w-3.5" /> {exp.period}
                    </span>
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-ink-500 dark:text-ink-400">{exp.role}</div>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
