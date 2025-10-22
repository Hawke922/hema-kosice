import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./JoinSection.module.css";

const JoinSection = () => {
  const { targetRef: headerRef, isIntersecting: isHeaderIntersecting } =
    useDirectionalIntersection<HTMLHeadingElement>({
      rootMargin: "-10% 0px -20% 0px",
    });

  return (
    <section className={classes.wrapper} id="join">
      <div className={classes["background-container"]}>
        <img
          className={classes["background-image"]}
          src="/images/Serm-119.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className={classes.content}>
        <h1 className={classes.header}>Feeling like swordfighting?</h1>
        <div className={classes["text-wrapper"]}>
          <h2
            ref={headerRef}
            className={`${classes["sub-header"]} ${
              isHeaderIntersecting ? classes["sub-header--visible"] : ""
            }`}
          >
            Come in, you're always welcome.
          </h2>
          <p>
            We train every Tuesday and Thursday from 18:00 to 20:00 at the gym
            of Gymnázium Poštová, Poštová 9, Košice. Just come in and join us,
            no prior experience needed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
