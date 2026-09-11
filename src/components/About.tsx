import { CheckCircle2, Sparkles, Briefcase, GraduationCap } from 'lucide-react';

const FOCUS = [
  'Computer Vision',
  'Object Detection',
  'Object Tracking',
  'OCR',
  'Image Processing',
  'Machine Learning',
  'Deep Learning',
  'Generative AI / RAG',
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="container-px">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="reveal relative order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-500/30 to-accent-500/30 blur-2xl sm:rounded-[2.5rem]" />
              {/* No fixed aspect-square on mobile — content was getting clipped */}
              <div className="glass-card relative overflow-hidden p-5 sm:p-7 lg:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-lg font-bold">Mahnoor Shahid</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">AI Engineer · Computer Vision</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3 sm:mt-6">
                  {[
                    { icon: Briefcase, label: 'Current role', value: 'AI Engineer @ Thingtrax' },
                    { icon: GraduationCap, label: 'Primary focus', value: 'Computer Vision · Industrial AI' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-3 rounded-xl bg-white/40 p-3 dark:bg-white/5">
                      <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-wide text-ink-500 dark:text-ink-400">{row.label}</div>
                        <div className="text-sm font-medium text-ink-800 dark:text-ink-100 break-words">{row.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 sm:mt-6">
                  <div className="text-xs uppercase tracking-wide text-ink-500 dark:text-ink-400">Core focus</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {FOCUS.map((f) => (
                      <span key={f} className="chip">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-6 -bottom-6 hidden h-24 w-24 animate-spin-slow rounded-full border border-dashed border-brand-400/40 sm:block" />
              </div>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <span className="reveal eyebrow">
              <span className="h-px w-6 bg-brand-500" /> About Me
            </span>
            <h2 className="reveal section-title mt-3 text-balance">
              AI Engineer building{' '}
              <span className="text-brand-600 dark:text-brand-400">practical intelligent systems</span>
            </h2>
            <div className="reveal mt-5 space-y-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300 sm:mt-6 sm:text-base">
              <p>
                I'm an AI Engineer focused on Computer Vision and industrial AI — building systems for object
                detection, object tracking, OCR, image processing and quality analysis that hold up in real
                environments.
              </p>
              <p>
                I currently work as an{' '}
                <strong className="text-ink-900 dark:text-white">AI Engineer at Thingtrax</strong>, where I develop
                customer-focused computer vision workflows for manufacturing and production-line use cases.
              </p>
              <p>
                Alongside vision systems, I also build Machine Learning models and Generative AI / RAG applications
                when the problem calls for end-to-end intelligent software — always with clean, maintainable code and
                a clear business outcome.
              </p>
            </div>

            <ul className="reveal mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2">
              {[
                'Strong Computer Vision experience',
                'Industrial AI & production workflows',
                'End-to-end AI development',
                'Business-focused problem solving',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-ink-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
