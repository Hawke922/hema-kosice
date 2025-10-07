import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

import classes from "./TeamSection.module.css";

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerParallax = useTransform(scrollYProgress, [0, 1], [0, 125]);

  const mainImageParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const sideImageParallax = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={sectionRef} className={classes.wrapper} id="team">
      <motion.h1 className={classes.header} style={{ y: headerParallax }}>
        Our crew
      </motion.h1>
      <div className={classes["image-wrapper"]}>
        <motion.img
          style={{ y: sideImageParallax }}
          className={classes.image}
          src="/images/Serm-24.jpg"
          alt="medvid"
        />
        <motion.img
          style={{ y: mainImageParallax }}
          className={classes.image}
          src="/images/Serm-38.png"
          alt="slav"
        />
        <motion.img
          style={{ y: sideImageParallax }}
          className={classes.image}
          src="/images/Serm-65.jpg"
          alt="jox"
        />
      </div>
      <p className={classes.text}>
        In our team, we have a mix of experienced professionals and fresh
        talent. Each member brings unique skills and perspectives, contributing
        to our collective success. We believe in collaboration, continuous
        learning, and pushing the boundaries of what's possible. Together, we
        strive to create innovative solutions that make a difference.
      </p>
    </section>
  );
};

export default TeamSection;
