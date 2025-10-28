import { useEffect, useRef, useState } from "react";

type EntryDirection = "top" | "bottom" | null;

type UseDirectionalIntersectionOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

export const useDirectionalIntersection = <T extends HTMLElement>({
  rootMargin = "-50% 0px -50% 0px",
  threshold = 0,
}: UseDirectionalIntersectionOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entryDirection, setEntryDirection] = useState<EntryDirection>(null);

  const targetRef = useRef<T | null>(null);
  const lastTopRef = useRef<number | null>(null);
  const wasIntersectingRef = useRef(false);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const visible = entry.isIntersecting;
        const currentTop = entry.boundingClientRect.top;
        const lastTop = lastTopRef.current;

        if (visible && !wasIntersectingRef.current) {
          if (lastTop !== null) {
            setEntryDirection(currentTop < lastTop ? "top" : "bottom");
          } else {
            setEntryDirection(null);
          }
        }

        setIsIntersecting(visible);
        wasIntersectingRef.current = visible;
        lastTopRef.current = currentTop;
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { targetRef, isIntersecting, entryDirection };
};
