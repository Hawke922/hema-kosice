import Column from './Column/Column';

import classes from './LandingSection.module.css';

const LandingSection = () => {
  return (
    <section className={classes.section}>
      <Column imagePath='/images/Serm-1.jpg' type='left' buttonLabel='Hema'/>
      <Column imagePath='/images/Serm-105.jpg' type='center' buttonLabel='KŠC team'/>
      <Column imagePath='/images/Serm-99.jpg' type='right' buttonLabel='Join us'/>
    </section>
  );
};

export default LandingSection;