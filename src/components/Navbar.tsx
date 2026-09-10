import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

type Props = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export function Navbar({ theme, toggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 16);
      setProgress(height > 0 ? (top / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-card dark:shadow-card-dark' : 'bg-transparent'
        }`}
      >
        <nav className="container-px flex h-16 items-center justify-between">
          <a href="#home" className="group flex items-center gap-2.5" onClick={close}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-bold tracking-tight">
              Mahnoor<span className="text-brand-500">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full glass text-ink-700 transition-colors hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-400"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a href="#contact" className="btn-primary hidden sm:inline-flex">
              Hire Me
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full glass text-ink-700 dark:text-ink-200 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Scroll progress */}
        <div className="h-0.5 w-full bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={close}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 glass p-6 pt-24 shadow-card-dark transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-400"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-3">
              <a href="#contact" onClick={close} className="btn-primary w-full">
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
