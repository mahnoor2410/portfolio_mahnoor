import { services } from '../data/portfolio';

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-60" />
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="reveal eyebrow justify-center">
            <span className="h-px w-6 bg-brand-500" /> Services
          </span>
          <h2 className="reveal section-title mt-3">AI services that move your business forward</h2>
          <p className="reveal mt-4 text-balance text-ink-600 dark:text-ink-300">
            Computer Vision first — with Machine Learning, Generative AI and AI backends when the product needs a
            complete intelligent system.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="reveal group relative overflow-hidden glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              {/* hover gradient sheen */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-500/0 to-accent-500/0 opacity-0 transition-opacity duration-300 group-hover:from-brand-500/5 group-hover:to-accent-500/10 group-hover:opacity-100" />

              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-600 transition-colors group-hover:from-brand-500 group-hover:to-accent-500 group-hover:text-white dark:text-brand-400">
                <s.icon className="h-6 w-6" />
              </span>

              <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
