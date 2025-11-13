import { useEffect, useState, useRef } from "react";

import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./HemaSection.module.css";
import { useTranslations } from "../../contexts/TranslationContext";

const SCROLL_THRESHOLD = 100;

const HemaSection = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollAccumulatorRef = useRef(0);

  const { targetRef: sectionRef, isIntersecting } =
    useDirectionalIntersection();

  const { translations } = useTranslations();

  const CONTENT = [
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-83.jpg`,
      title: translations.hema.content1.header,
      text: translations.hema.content1.paragraph,
    },
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-161.jpg`,
      title: translations.hema.content2.header,
      text: translations.hema.content2.paragraph,
    },
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-139.jpg`,
      title: translations.hema.content3.header,
      text: translations.hema.content3.paragraph,
    },
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-102.jpg`,
      title: translations.hema.content4.header,
      text: translations.hema.content4.paragraph,
    },
  ];

  const isTargeted = isHovered && isIntersecting;

  useEffect(() => {
    if (!isTargeted) return;

    const handleWheel = (e: WheelEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        const isMouseInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!isMouseInside) {
          setIsHovered(false);

          return;
        }
      }

      const isAtStart = currentContentIndex === 0;
      const isAtEnd = currentContentIndex === CONTENT.length - 1;

      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown)) return;

      e.preventDefault();

      scrollAccumulatorRef.current += Math.abs(e.deltaY);

      if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
        setIsTransitioning(true);

        // tento timeout je delay na fadein/fadeout effect pre carousel
        // TREBA SYNCNUT S CSS TRANSITION
        setTimeout(() => {
          setCurrentContentIndex((prev) =>
            isScrollingDown
              ? Math.min(prev + 1, CONTENT.length - 1)
              : Math.max(prev - 1, 0)
          );

          setIsTransitioning(false);
        }, 300);

        scrollAccumulatorRef.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [isHovered, isIntersecting, currentContentIndex, CONTENT.length]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${classes.wrapper} ${
        isTargeted ? classes["wrapper--hovered"] : ""
      }`}
      id="hema"
    >
      <div className={classes["image-container"]}>
        <img
          className={classes.image}
          src={CONTENT[currentContentIndex]?.imagePath}
          alt={`HEMA action ${currentContentIndex + 1}`}
        />
        <div
          className={`${classes.overlay} ${
            isTransitioning ? classes["overlay--active"] : ""
          }`}
        />
      </div>
      <div className={classes.content}>
        <div className={classes["text-content"]}>
          <h3 className={classes.title}>
            {CONTENT[currentContentIndex]?.title}
          </h3>
          <p className={classes.text}>{CONTENT[currentContentIndex]?.text}</p>
        </div>
        <div className={classes["index-container"]}>
          {CONTENT.map((contentObject, index) => (
            <div
              key={contentObject.imagePath}
              className={`${classes.index} ${
                classes[currentContentIndex === index ? "index--active" : ""]
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HemaSection;
