import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { getProjectById, getRelatedProjects } from '../data/portfolio';
import { ProjectVideo } from './ProjectVideo';

type Props = {
  projectId: string;
  onBack: () => void;
  onOpenProject: (id: string) => void;
};

export function CaseStudy({ projectId, onBack, onOpenProject }: Props) {
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <section className="relative px-4 pb-20 pt-28 sm:pt-32">
        <div className="container-px mx-auto max-w-3xl text-center">
          <h1 className="section-title text-3xl">Project not found</h1>
          <button onClick={onBack} className="btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" /> All Projects
          </button>
        </div>
      </section>
    );
  }

  const related = getRelatedProjects(project);

  return (
    <article className="relative pb-20 pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-50" />
      <div className="container-px mx-auto max-w-4xl">
        <button onClick={onBack} className="btn-ghost mb-8">
          <ArrowLeft className="h-4 w-4" /> All Projects
        </button>

        <div className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 break-words">
          {project.number} · {project.category}
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold leading-snug sm:text-4xl lg:text-5xl break-words">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
          {project.longDescription}
        </p>

        <div className="mt-10 overflow-hidden glass-card">
          <ProjectVideo src={project.video} poster={project.poster} title={project.title} />
        </div>

        <Section title="Overview">
          <p>{project.overview}</p>
        </Section>

        <Section title="What I Built">
          <ul className="space-y-2">
            {project.whatIBuilt.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Technical Approach">
          <p>{project.technicalApproach}</p>
        </Section>

        {project.pipeline && project.pipeline.length > 0 && (
          <Section title="System Pipeline">
            <div className="flex flex-wrap items-center gap-2">
              {project.pipeline.map((step, i) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-xl bg-brand-500/10 px-3 py-2 text-sm font-medium text-brand-700 dark:text-brand-300">
                    {step}
                  </span>
                  {i < project.pipeline!.length - 1 && <ArrowRight className="h-4 w-4 text-ink-400" />}
                </span>
              ))}
            </div>
          </Section>
        )}

        <Section title="Technology Stack">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Implementation Details">
          <ul className="space-y-2">
            {project.implementationDetails.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Challenges">
          <ul className="space-y-2">
            {project.challenges.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Results / Outcome">
          <p>{project.results}</p>
        </Section>

        {related.length > 0 && (
          <Section title="Related Projects">
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onOpenProject(p.id)}
                  className="glass-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {p.number} · {p.filterCategory}
                  </div>
                  <div className="mt-2 font-display text-base font-semibold">{p.title}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">{p.description}</p>
                </button>
              ))}
            </div>
          </Section>
        )}

        <section className="mt-14 overflow-hidden glass-card p-5 text-center sm:p-10">
          <h2 className="font-display text-xl font-bold sm:text-2xl">Let's Talk</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-600 dark:text-ink-300">
            Need a Computer Vision pipeline, OCR workflow or intelligent AI application? Tell me about your use case.
          </p>
          <a href="#contact" className="btn-primary mt-6">
            <MessageCircle className="h-4 w-4" /> Let's Talk
          </a>
        </section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300 sm:text-base">{children}</div>
    </section>
  );
}
