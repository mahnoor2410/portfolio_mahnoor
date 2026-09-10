import { useEffect, useState } from 'react';

/**
 * Cycles through a list of phrases with a typewriter effect.
 */
export function useTyping(phrases: string[], opts?: { typeSpeed?: number; deleteSpeed?: number; pause?: number }) {
  const { typeSpeed = 70, deleteSpeed = 35, pause = 1600 } = opts ?? {};
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index % phrases.length];
    let timeout: number;

    if (!deleting && text === full) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((prev) =>
            deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  return text;
}
