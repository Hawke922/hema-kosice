import { useEffect, useState, useRef } from "react";
import classes from "./HemaSection.module.css";

type HemaSectionProps = {
  imagePaths: string[];
};

const HemaSection = ({ imagePaths }: HemaSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<
    "top" | "bottom" | null
  >(null);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollAccumulator = useRef(0);

  const lastY = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) return;

        const isVisible = entry.isIntersecting;
        const currentY = entry.boundingClientRect.top;

        if (isVisible && !isInViewport) {
          if (lastY.current !== null) {
            if (currentY < lastY.current) {
              setScrollDirection("top");
            } else {
              setScrollDirection("bottom");
            }
          }
        }

        setIsInViewport(isVisible);

        lastY.current = currentY;
      },
      { threshold: [0], rootMargin: "-50% 0px -50% 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInViewport) {
      return;
    }

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      scrollAccumulator.current += Math.abs(e.deltaY);

      // Change image every 100 pixels of scroll
      if (scrollAccumulator.current > 100) {
        setCurrentImageIndex((prev) => {
          let nextIndex = prev;

          // Detect direction from deltaY: positive = scrolling down, negative = scrolling up
          if (e.deltaY > 0) {
            nextIndex = Math.min(prev + 1, imagePaths.length - 1);
          } else {
            nextIndex = Math.max(prev - 1, 0);
          }

          const isTryingToScrollBeyondStart = e.deltaY < 0 && prev === 0;
          const isTryingToScrollBeyondEnd =
            e.deltaY > 0 && prev === imagePaths.length - 1;

          if (isTryingToScrollBeyondStart || isTryingToScrollBeyondEnd) {
            setTimeout(() => setIsInViewport(false), 100);
          }

          return nextIndex;
        });

        scrollAccumulator.current = 0;
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => window.removeEventListener("wheel", handleScroll);
  }, [isInViewport, scrollDirection, imagePaths.length]);

  useEffect(() => {
    if (scrollDirection === "top") {
      setCurrentImageIndex(0);
    } else if (scrollDirection === "bottom") {
      setCurrentImageIndex(imagePaths.length - 1);
    }
  }, [scrollDirection, imagePaths.length]);

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
      <p className={classes.text}>
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
