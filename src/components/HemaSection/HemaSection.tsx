import { useEffect, useState, useRef } from "react";
import classes from "./HemaSection.module.css";

type HemaSectionProps = {
  imagePaths: string[];
};

const SCROLL_THRESHOLD = 100;

const HemaSection = ({ imagePaths }: HemaSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [scrollDirectionOnEntry, setScrollDirectionOnEntry] = useState<
    "top" | "bottom" | null
  >(null);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollAccumulatorRef = useRef(0);
  const lastTopRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        let lastTop = lastTopRef.current;
        const visible = entry.isIntersecting;
        const currentTop = entry.boundingClientRect.top;

        if (visible && !isIntersecting) {
          if (lastTop !== null) {
            if (currentTop < lastTop) {
              setScrollDirectionOnEntry("top");
            } else {
              setScrollDirectionOnEntry("bottom");
            }
          } else {
            setScrollDirectionOnEntry(null);
          }
        }

        setIsIntersecting(visible);
        lastTop = currentTop;
      },
      { threshold: [0], rootMargin: "-50% 0px -50% 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (!isIntersecting || !scrollDirectionOnEntry) return;

    if (scrollDirectionOnEntry === "top") {
      setCurrentImageIndex(0);
    } else if (scrollDirectionOnEntry === "bottom") {
      setCurrentImageIndex(imagePaths.length - 1);
    }
  }, [isIntersecting, scrollDirectionOnEntry, imagePaths.length]);

  useEffect(() => {
    if (!isIntersecting) return;

    const handleWheel = (e: WheelEvent) => {
      const atStart = currentImageIndex === 0;
      const atEnd = currentImageIndex === imagePaths.length - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      const tryingPastStart = atStart && scrollingUp;
      const tryingPastEnd = atEnd && scrollingDown;

      if (tryingPastStart || tryingPastEnd) {
        return;
      }

      e.preventDefault();

      scrollAccumulatorRef.current += Math.abs(e.deltaY);

      if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
        setCurrentImageIndex((prev) => {
          if (scrollingDown) return Math.min(prev + 1, imagePaths.length - 1);
          return Math.max(prev - 1, 0);
        });
        scrollAccumulatorRef.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [isIntersecting, currentImageIndex, imagePaths.length]);

  return (
    <section ref={sectionRef} className={classes.section}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={imagePaths[currentImageIndex]}
          alt={`HEMA action ${currentImageIndex + 1}`}
        />
        <div className={classes.imageIndexContainer}>
          {imagePaths.map((path, index) => (
            <div
              key={path}
              className={`${classes.imageIndex} ${
                classes[currentImageIndex === index ? "imageIndex--active" : ""]
              }`}
            />
          ))}
        </div>
      </div>
      <p
        className={`${classes.text} ${
          isIntersecting ? classes["text--visible"] : ""
        }`}
      >
        Historical European Martial Arts (HEMA) is the study and practice of
        martial techniques from Europe, primarily from the Middle Ages to the
        early modern period. It encompasses a wide range of fighting styles,
        including swordsmanship, grappling, and weapon-based combat, often
        reconstructed from historical manuals and treatises.
      </p>
    </section>
  );
};

export default HemaSection;
