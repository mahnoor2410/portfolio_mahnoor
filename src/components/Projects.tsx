import { useMemo, useState } from 'react';
import { ArrowRight, FileText, Star } from 'lucide-react';
import { projects, type Project, type ProjectFilter } from '../data/portfolio';
import { ProjectVideo } from './ProjectVideo';
import { useReveal } from '../hooks/useReveal';

const FILTERS: ProjectFilter[] = ['All', 'Computer Vision', 'Machine Learning', 'NLP / GenAI', 'Full-Stack AI'];

type Props = {
  onOpenCaseStudy: (projectId: string) => void;
};

export function Projects({ onOpenCaseStudy }: Props) {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  useReveal([filter]);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.filterCategory === filter)),
    [filter],
  );

  const featuredVisible = visible.filter((p) => p.featured);
  const gridVisible = visible.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="reveal eyebrow justify-center">
            <span className="h-px w-6 bg-brand-500" /> Featured Projects
          </span>
          <h2 className="reveal section-title mt-3">Computer Vision systems and intelligent applications</h2>
          <p className="reveal mt-4 text-ink-600 dark:text-ink-300">
            Six projects spanning industrial vision pipelines, machine learning and generative AI — with Computer
            Vision work featured first.
          </p>
        </div>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow'
                  : 'glass text-ink-600 hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {featuredVisible.length > 0 && (
          <div className="mt-10 space-y-6">
            <div className="reveal flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <Star className="h-3.5 w-3.5 fill-current" /> Featured Computer Vision Work
            </div>
            {featuredVisible.map((project) => (
              <FeaturedCard key={project.id} project={project} onCaseStudy={() => onOpenCaseStudy(project.id)} />
            ))}
          </div>
        )}

        {gridVisible.length > 0 && (
          <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${featuredVisible.length > 0 ? 'mt-10' : 'mt-10'}`}>
            {gridVisible.map((p) => (
              <ProjectCard key={p.id} project={p} onCaseStudy={() => onOpenCaseStudy(p.id)} />
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-ink-500 dark:text-ink-400">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ project, onCaseStudy }: { project: Project; onCaseStudy: () => void }) {
  return (
    <article className="group reveal relative overflow-hidden glass-card">
      <div className="grid lg:grid-cols-5">
        <div className="relative col-span-2 min-h-[220px] overflow-hidden bg-ink-950 lg:min-h-[340px]">
          <ProjectVideo
            src={project.video}
            poster={project.poster || project.image}
            title={project.title}
            className="h-full min-h-[220px] lg:min-h-[340px] aspect-auto"
          />
          <span className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-current" /> {project.number} · Featured
          </span>
        </div>

        <div className="col-span-3 p-7 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {project.category}
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm font-medium text-ink-500 dark:text-ink-400">{project.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.description}</p>

          {project.pipeline && (
            <div className="mt-4 overflow-x-auto">
              <div className="flex min-w-max items-center gap-1.5 text-[11px] text-ink-500 dark:text-ink-400">
                {project.pipeline.map((step, i) => (
                  <span key={step} className="inline-flex items-center gap-1.5">
                    <span className="rounded-md bg-brand-500/10 px-2 py-1 font-medium text-brand-700 dark:text-brand-300">
                      {step}
                    </span>
                    {i < project.pipeline!.length - 1 && <ArrowRight className="h-3 w-3 shrink-0 opacity-50" />}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={onCaseStudy} className="btn-primary">
              <FileText className="h-4 w-4" /> View Case Study
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, onCaseStudy }: { project: Project; onCaseStudy: () => void }) {
  return (
    <article className="group reveal flex h-full flex-col overflow-hidden glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-ink-800 to-ink-950">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid-dark bg-[size:24px_24px] opacity-40" />
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-500/30 blur-2xl transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-accent-500/30 blur-2xl transition-transform duration-500 group-hover:scale-125" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {project.number} · {project.filterCategory}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {project.category}
        </div>
        <h3 className="mt-1 font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-ink-500 dark:text-ink-400">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <span key={t} className="chip text-[11px]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-1 items-end pt-2">
          <button type="button" onClick={onCaseStudy} className="btn-outline px-4 py-2 text-xs">
            <FileText className="h-3.5 w-3.5" /> View Case Study
          </button>
        </div>
      </div>
    </article>
  );
}
