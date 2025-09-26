import classes from './LandingSection.module.css';

const LandingSection = () => {
  return (
    <section className={classes.section}>
      <div className={`${classes.column} ${classes.red}`}></div>
      <div className={`${classes.column} ${classes.blue}`}></div>
      <div className={`${classes.column} ${classes.green}`}></div>
    </section>
  );
};

export default LandingSection;