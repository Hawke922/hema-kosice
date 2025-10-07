import { useRef } from "react";
import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./JoinSection.module.css";
import { motion, useScroll, useTransform } from "motion/react";

const JoinSection = () => {
  const { targetRef: headerRef, isIntersecting: isHeaderIntersecting } =
    useDirectionalIntersection<HTMLHeadingElement>({
      rootMargin: "-10% 0px -20% 0px",
    });
  const { targetRef: paragraphRef, isIntersecting: isParagraphIntersecting } =
    useDirectionalIntersection<HTMLParagraphElement>({
      rootMargin: "-25% 0px -30% 0px",
    });
  const { targetRef: imageRef, isIntersecting: isImageIntersecting } =
    useDirectionalIntersection<HTMLImageElement>({
      rootMargin: "0px 0px -30% 0px",
    });

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={sectionRef} className={classes.wrapper} id="join">
      <div className={classes["text-wrapper"]}>
        <h1 className={classes.header}>Feeling like swordfighting?</h1>
        <h2
          ref={headerRef}
          className={`${classes["sub-header"]} ${
            isHeaderIntersecting ? classes.visible : ""
          }`}
        >
          Come in, you're always welcome.
        </h2>
        <p
          ref={paragraphRef}
          className={`${classes.text} ${
            isParagraphIntersecting ? classes.visible : ""
          }`}
        >
          We train every Tuesday and Thursday from 18:00 to 20:00 at the gym of
          Gymnázium Poštová, Poštová 9, Košice. Just come in and join us, no
          prior experience needed.
        </p>
      </div>
      <motion.img
        style={{ y: imageParallax }}
        ref={imageRef}
        className={`${classes.image} ${
          isImageIntersecting ? classes.visible : ""
        }`}
        src="/images/Serm-119.jpg"
        alt="Join us"
      />
    </section>
  );
};

export default JoinSection;
