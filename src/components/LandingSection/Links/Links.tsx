import { useState } from "react";

import classes from "./Links.module.css";

type LinksProps = {
  isExpandable: boolean;
};

const Links = ({ isExpandable }: LinksProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderContent = () => (
    <>
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
    </>
  );

  return (
    <>
      <div
        className={`${classes.wrapper} ${classes["wrapper--expandable"]} ${
          isExpanded ? classes["wrapper--expanded"] : ""
        } ${!isExpandable ? classes["wrapper--hidden"] : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        aria-hidden={!isExpandable}
      >
        <img src="/logo-simple.svg" alt="KSC logo" className={classes.logo} />
        {isExpanded && renderContent()}
      </div>

      <div
        className={`${classes.wrapper} ${
          isExpandable ? classes["wrapper--hidden"] : ""
        }`}
        aria-hidden={isExpandable}
      >
        {renderContent()}
      </div>
    </>
  );
};

export default Links;
