import classes from './TeamSection.module.css'

const TeamSection = () =>{
  return (
    <section className={classes.wrapper}>
        <img className={classes.image} src="/images/Serm-24.jpg" alt="medvid" />
        <img className={classes.image} src="/images/Serm-38.png" alt="slav" />
        <img className={classes.image} src="/images/Serm-65.jpg" alt="jox" />
    </section>
  );
};

export default TeamSection