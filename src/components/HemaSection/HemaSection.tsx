import { useEffect, useState, useRef } from "react";

import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./HemaSection.module.css";

const SCROLL_THRESHOLD = 100;

const CONTENT = [
  {
    imagePath: "/images/Serm-83.jpg",
    title: "What is HEMA?",
    text: `Historical European Martial Arts (HEMA) is the study and practice of
    martial techniques from Europe, primarily from the Middle Ages to the
    early modern period. It encompasses a wide range of fighting styles,
    including swordsmanship, grappling, and weapon-based combat, often
    reconstructed from historical manuals and treatises.`,
  },
  {
    imagePath: "/images/Serm-102.jpg",
    title: "Practice and Community",
    text: `HEMA practitioners often train with replica weapons and armor,
    adhering to safety protocols to minimize the risk of injury. The community
    is diverse, with enthusiasts ranging from casual hobbyists to serious
    competitors who participate in tournaments and events worldwide.`,
  },
  {
    imagePath: "/images/Serm-139.jpg",
    title: "Revival and Popularity",
    text: `The resurgence of HEMA in recent decades has been driven by a
    combination of historical interest, academic research, and a passion for
    martial arts. It offers a unique blend of physical activity, historical
    study, and cultural appreciation, attracting individuals interested in
    history, combat sports, and traditional martial arts.`,
  },
  {
    imagePath: "/images/Serm-161.jpg",
    title: "Cultural Significance",
    text: `Overall, HEMA is a dynamic and evolving discipline that connects
    modern practitioners with the martial traditions of Europe's past,
    fostering a deeper understanding of historical combat techniques and their
    cultural significance.`,
  },
];

const HemaSection = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollAccumulatorRef = useRef(0);

  const { targetRef: sectionRef, isIntersecting } =
    useDirectionalIntersection();

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
      className={`${classes.section} ${
        isTargeted ? classes["section--hovered"] : ""
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
