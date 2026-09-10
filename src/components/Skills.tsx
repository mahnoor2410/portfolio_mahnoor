import { skillCategories } from '../data/portfolio';
import { Code2, Brain, Network, Sparkles, Eye, Wrench, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Programming: Code2,
  'Machine Learning': Brain,
  'Deep Learning': Network,
  'Computer Vision': Eye,
  'Generative AI': Sparkles,
  Backend: Server,
  Tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="reveal eyebrow justify-center">
            <span className="h-px w-6 bg-brand-500" /> Skills
          </span>
          <h2 className="reveal section-title mt-3">Technologies I work with every day</h2>
          <p className="reveal mt-4 text-ink-600 dark:text-ink-300">
            A focused toolkit across Computer Vision, Machine Learning, Generative AI and AI backends.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => {
            const Icon = ICONS[cat.name] ?? Code2;
            return (
              <div key={cat.name} className="reveal glass-card p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-600 dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{cat.name}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="chip transition-colors hover:border-brand-400 hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
