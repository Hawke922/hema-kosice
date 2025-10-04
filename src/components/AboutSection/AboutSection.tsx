import classes from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <section className={classes.wrapper}>
      <h1 className={classes.header}>Košice fencing guild</h1>
      <p className={classes.text}>
        Our club is dedicated to preserving and practicing the martial
        traditions of medieval and renaissance Europe. Join us to learn
        authentic techniques from historical treatises and manuscripts.
      </p>
    </section>
  );
};

export default AboutSection;
