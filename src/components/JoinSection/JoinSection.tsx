import classes from "./JoinSection.module.css";

const JoinSection = () => {
  return (
    <section className={classes.wrapper}>
      <h1>Feeling like swordfighting?</h1>
      <h2>Come in, you're always welcome.</h2>
      <p>
        We train every Tuesday and Thursday from 18:00 to 20:00 at the gym of
        Gymnázium Poštová, Poštová 9, Košice. Just come in and join us, no prior
        experience needed.
      </p>
      <img className={classes.image} src="/images/Serm-119.jpg" alt="Join us" /> 
    </section>
  );
};

export default JoinSection;
