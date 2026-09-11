import { ArrowRight, MessageCircle, FolderGit2, MapPin } from 'lucide-react';
import { NeuralCanvas } from './NeuralCanvas';
import { useTyping } from '../hooks/useTyping';

type Props = { theme: 'light' | 'dark' };

export function Hero({ theme }: Props) {
  const typed = useTyping(
    [
      'Computer Vision',
      'Object Detection',
      'Object Tracking',
      'OCR',
      'Image Processing',
      'Deep Learning',
      'Generative AI',
      'RAG & LLMs',
    ],
    { typeSpeed: 75, deleteSpeed: 35, pause: 1500 },
  );

  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-20 lg:pt-44">
      {/* Background layers — isolate keeps -z layers above the page body */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-[size:44px_44px] dark:bg-grid-dark mask-fade-b" />
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70">
        <NeuralCanvas dark={theme === 'dark'} />
      </div>

      <div className="relative z-10 container-px">
        <div className="mx-auto max-w-4xl text-center">
          <div className="reveal mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 sm:mb-6 sm:px-4">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            AI Engineer · Computer Vision
            <span className="hidden sm:inline-flex items-center gap-1 text-ink-400">
              <MapPin className="h-3 w-3" /> Lahore, Pakistan
            </span>
          </div>

          <p className="reveal text-sm font-medium uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            AI Engineer
          </p>
          <p className="reveal mt-2 px-1 text-sm text-ink-500 dark:text-ink-400 sm:text-base">
            Computer Vision · Machine Learning · Intelligent Systems
          </p>

          <h1 className="reveal section-title mt-4 text-balance text-3xl sm:mt-5 sm:text-5xl lg:text-6xl xl:text-7xl">
            Building Intelligent Vision Systems for{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              Real-World Applications
            </span>
          </h1>

          <p className="reveal mx-auto mt-5 max-w-2xl text-balance text-sm leading-relaxed text-ink-600 dark:text-ink-300 sm:mt-6 sm:text-lg">
            I build practical AI systems using Computer Vision, Machine Learning and Generative AI — from
            real-time detection and tracking to OCR, image analysis and intelligent applications.
          </p>

          <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-ink-500 dark:text-ink-400 sm:mt-8 sm:text-base">
            <span className="text-brand-500">&gt;</span>
            <span>focus</span>
            <span className="font-semibold text-ink-800 dark:text-white">{typed}</span>
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-brand-500 sm:h-6" />
          </div>

          <div className="reveal mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#projects" className="btn-primary w-full sm:w-auto">
              <FolderGit2 className="h-4 w-4" /> View My Work <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" /> Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
