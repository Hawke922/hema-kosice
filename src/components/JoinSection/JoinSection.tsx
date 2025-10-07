import { useDirectionalIntersection } from "../../hooks/useDirectionalIntersection";

import classes from "./JoinSection.module.css";

const JoinSection = () => {
  const { targetRef: headerRef, isIntersecting: isHeaderIntersecting } =
    useDirectionalIntersection<HTMLHeadingElement>({
      rootMargin: "-10% 0px -20% 0px",
    });
  const { targetRef: paragraphRef, isIntersecting: isParagraphIntersecting } =
    useDirectionalIntersection<HTMLParagraphElement>({
      rootMargin: "-25% 0px -30% 0px",
    });
  const { targetRef: imageRef, isIntersecting: isImageIntersecting } =
    useDirectionalIntersection<HTMLImageElement>();

  return (
    <section className={classes.wrapper}>
      <div>
        <h1>Feeling like swordfighting?</h1>
        <h2
          ref={headerRef}
          className={`${classes['sub-header']} ${
            isHeaderIntersecting ? classes.visible : ""
          }`}
        >
          Come in, you're always welcome.
        </h2>
        <p
          ref={paragraphRef}
          className={`${classes.text} ${
            isParagraphIntersecting ? classes.visible : ""
          }`}
        >
          We train every Tuesday and Thursday from 18:00 to 20:00 at the gym of
          Gymnázium Poštová, Poštová 9, Košice. Just come in and join us, no
          prior experience needed.
        </p>
      </div>
      <img
        ref={imageRef}
        className={`${classes.image} ${
          isImageIntersecting ? classes["image--visible"] : ""
        }`}
        src="/images/Serm-119.jpg"
        alt="Join us"
      />
    </section>
  );
};

export default JoinSection;
