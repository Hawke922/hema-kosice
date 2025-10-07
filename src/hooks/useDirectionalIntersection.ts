import { useEffect, useRef, useState } from "react";

export type EntryDirection = "top" | "bottom" | null;

export function useDirectionalIntersection() {
  const targetRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entryDirection, setEntryDirection] = useState<EntryDirection>(null);
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

        // Transition: not intersecting -> intersecting
        if (visible && !wasIntersectingRef.current) {
          if (lastTop !== null) {
            if (currentTop < lastTop) {
              setEntryDirection("top");
            } else if (currentTop > lastTop) {
              setEntryDirection("bottom");
            } else {
              setEntryDirection(null);
            }
          } else {
            setEntryDirection(null);
          }
        }

        if (!visible && wasIntersectingRef.current) {
          // Leaving viewport; allow direction recalculation next time
        }

        setIsIntersecting(visible);
        wasIntersectingRef.current = visible;
        lastTopRef.current = currentTop;
      },
      { threshold: [0], rootMargin: "-50% 0px -50% 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { targetRef, isIntersecting, entryDirection };
}
