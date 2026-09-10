import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  src?: string;
  poster?: string;
  title: string;
  className?: string;
};

/**
 * Shows a poster/thumbnail first. Video loads and plays only after the user clicks.
 */
export function ProjectVideo({ src, poster, title, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {
      // Controls remain available if autoplay is blocked.
    });
  }, [playing]);

  const frameClass = className.includes('aspect-')
    ? `relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-ink-800 to-ink-950 ${className}`
    : `relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-ink-800 to-ink-950 ${className}`;

  if (!src || failed) {
    return (
      <div className={frameClass}>
        {poster ? (
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid-dark bg-[size:24px_24px] opacity-40" />
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-500/30 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-accent-500/30 blur-2xl" />
          </>
        )}
        <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur">
            <Play className="h-5 w-5 fill-current" />
          </span>
          <p className="text-sm font-medium text-white/90">Demo video coming soon</p>
          <p className="text-xs text-white/60">{title}</p>
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className={`${frameClass} group w-full cursor-pointer border-0 p-0 text-left`}
        aria-label={`Play ${title} demo video`}
      >
        {poster ? (
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-grid-dark bg-[size:24px_24px] opacity-40" />
        )}
        <div className="absolute inset-0 bg-ink-950/35 transition-colors group-hover:bg-ink-950/25" />
        <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white shadow-glow backdrop-blur transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 fill-current" />
        </span>
      </button>
    );
  }

  return (
    <div
      className={
        className.includes('aspect-')
          ? `relative overflow-hidden bg-ink-950 ${className}`
          : `relative aspect-video overflow-hidden bg-ink-950 ${className}`
      }
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={`${title} demo video`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
