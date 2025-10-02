import Column from './Column/Column';

import classes from './LandingSection.module.css';

const LandingSection = () => {
  return (
    <section className={classes.section}>
      <Column imagePath='/images/Serm-1.jpg' type='left'/>
      <Column imagePath='/images/Serm-105.jpg' type='center'/>
      <Column imagePath='/images/Serm-99.jpg' type='right'/>
    </section>
  );
};

export default LandingSection;