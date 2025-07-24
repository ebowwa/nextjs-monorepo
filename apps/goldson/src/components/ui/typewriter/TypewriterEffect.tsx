// src/components/typewriter/TypewriterEffect.tsx

import { useState, useEffect, useRef } from 'react';

const useTypewriterEffect = (categories: string[], isClient: boolean) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingSpeed = 200;
  const deletingSpeed = 100;
  const pauseTime = 1500;

  useEffect(() => {
    if (!isClient) return; // Do nothing during server-side rendering

    if (subIndex === categories[index].length + 1 && !reverse) {
      timeoutRef.current = setTimeout(() => setReverse(true), pauseTime);
      return;
    }

    if (subIndex === 0 && reverse) {
      timeoutRef.current = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % categories.length);
      }, pauseTime);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [subIndex, index, reverse, isClient, categories]);

  return `${categories[index].substring(0, subIndex)}${reverse ? "|" : ""}`;
};

export default useTypewriterEffect;

