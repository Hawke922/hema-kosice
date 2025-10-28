import { useState, useEffect } from "react";

import classes from "./TeamSection.module.css";
import { useTranslations } from "../../contexts/TranslationContext";

const PROFILE_IMAGE_PATHS = [
  "/images/Serm-24.jpg",
  "/images/Serm-38.png",
  "/images/Serm-65.jpg",
];

const TeamSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const { translations } = useTranslations();

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
        className={`${classes.image} ${
          fadeOut ? classes["image--fade-out"] : ""
        }`}
        src={PROFILE_IMAGE_PATHS[currentImageIndex]}
        alt="profile-image"
      />
      <div className={classes.content}>
        <h1 className={classes.header}>{translations.team.header}</h1>
        <p className={classes.text}>
          {translations.team.content.map((paragraph, i) => (
            <>
              <p key={i}>{paragraph}</p>
              {i !== translations.team.content.length - 1 && <br />}
            </>
          ))}
        </p>
      </div>
    </section>
  );
};

export default TeamSection;
