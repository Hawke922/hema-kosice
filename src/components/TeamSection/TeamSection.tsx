import classes from "./TeamSection.module.css";

const TeamSection = () => {
  return (
    <section className={classes.wrapper}>
      <h1>Our crew</h1>
      <div className={classes["image-wrapper"]}>
        <img className={classes.image} src="/images/Serm-24.jpg" alt="medvid" />
        <img className={classes.image} src="/images/Serm-38.png" alt="slav" />
        <img className={classes.image} src="/images/Serm-65.jpg" alt="jox" />
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
