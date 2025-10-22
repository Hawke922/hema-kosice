import { useState, useEffect } from "react";

import classes from "./TeamSection.module.css";

const PROFILE_IMAGE_PATHS = [
  "/images/Serm-24.jpg",
  "/images/Serm-38.png",
  "/images/Serm-65.jpg",
];

const TeamSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === PROFILE_IMAGE_PATHS.length - 1 ? 0 : prevIndex + 1
        );

        setFadeOut(false);
      }, 300); // TREBA SYNCNUT S CSS TRANSITION TIME
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={classes.wrapper} id="team">
      <img
        className={`${classes.image} ${fadeOut ? classes["image--fade-out"] : ""}`}
        src={PROFILE_IMAGE_PATHS[currentImageIndex]}
        alt="profile-image"
      />
      <div className={classes.content}>
        <h1 className={classes.header}>Our crew</h1>
        <p className={classes.text}>
          In our team, we have a mix of experienced professionals and fresh
          talent. Each member brings unique skills and perspectives,
          contributing to our collective success. We believe in collaboration,
          continuous learning, and pushing the boundaries of what's possible.
          Together, we strive to create innovative solutions that make a
          difference.
        </p>
      </div>
    </section>
  );
};

export default TeamSection;
