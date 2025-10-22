import classes from "./Links.module.css";

const Links = () => {
  return (
    <div className={classes.wrapper}>
      <a href="#" className={classes.link}>
        2%
      </a>
      <button className={classes["language-button"]}>SK</button>
      <a
        href="https://www.facebook.com/kosicehema"
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <img src="/facebook-icon.svg" alt="Facebook" className={classes.icon} />
      </a>
      <a
        href="https://www.instagram.com/kosice.hema"
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <img
          src="/instagram-icon.svg"
          alt="Instagram"
          className={classes.icon}
        />
      </a>
    </div>
  );
};

export default Links;
