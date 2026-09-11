import { useEffect, useState } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'Email', href: 'mailto:mahnoorshahid2410@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mahnoorshahid2410' },
  { label: 'GitHub', href: 'https://github.com/mahnoor2410' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-ink-200/60 py-12 dark:border-white/10">
      <div className="container-px">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div className="max-w-sm text-center sm:text-left">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-bold">
                Mahnoor<span className="text-brand-500">.</span>
              </span>
            </a>
            <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
              Mahnoor Shahid — AI Engineer building practical Machine Learning, Computer Vision and Generative AI
              solutions.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="link-underline text-sm text-ink-600 hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ink-200/60 pt-6 dark:border-white/10 sm:flex-row">
          <p className="text-xs text-ink-500 dark:text-ink-400">
            © {new Date().getFullYear()} Mahnoor Shahid. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="link-underline text-xs font-medium text-ink-600 hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-20 right-4 z-50 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-glow transition-all duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
