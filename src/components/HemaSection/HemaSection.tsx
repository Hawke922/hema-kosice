import { useEffect, useState, useRef } from "react";

import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./HemaSection.module.css";

type HemaSectionProps = {
  imagePaths: string[];
};

const SCROLL_THRESHOLD = 100;

const HemaSection = ({ imagePaths }: HemaSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollAccumulatorRef = useRef(0);

  const { targetRef, isIntersecting, entryDirection } =
    useDirectionalIntersection<HTMLDivElement>();

  useEffect(() => {
    if (!isIntersecting || !entryDirection) return;

    if (entryDirection === "top") {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(imagePaths.length - 1);
    }
  }, [isIntersecting, entryDirection, imagePaths.length]);

  useEffect(() => {
    if (!isIntersecting) return;

    const handleWheel = (e: WheelEvent) => {
      const isAtStart = currentImageIndex === 0;
      const isAtEnd = currentImageIndex === imagePaths.length - 1;

      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown)) return;

      e.preventDefault();

      scrollAccumulatorRef.current += Math.abs(e.deltaY);

      if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
        setCurrentImageIndex((prev) =>
          isScrollingDown
            ? Math.min(prev + 1, imagePaths.length - 1)
            : Math.max(prev - 1, 0)
        );

        scrollAccumulatorRef.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [isIntersecting, currentImageIndex, imagePaths.length]);

  return (
    <section className={classes.section} id="hema">
      <img
        className={classes.image}
        src={imagePaths[currentImageIndex]}
        alt={`HEMA action ${currentImageIndex + 1}`}
      />
      <div ref={targetRef} className={classes.textContainer}>
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
        <div className={classes.indexContainer}>
          {imagePaths.map((path, index) => (
            <div
              key={path}
              className={`${classes.index} ${
                classes[currentImageIndex === index ? "index--active" : ""]
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HemaSection;
