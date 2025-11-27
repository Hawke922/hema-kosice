import { useCallback, useRef, useEffect, useState } from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "../../contexts/TranslationContext";
import Icon from "../_scaffolding/Icon/Icon";

import classes from "./HemaSection.module.css";

type textPlacement = "left" | "right";

type HemaCarouselItem = {
  imagePath: string;
  title: string;
  text: string;
  placement: textPlacement;
};

const TWEEN_FACTOR_BASE = 0.85;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const HemaSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // all this just to programmatically handle opacity of the side slides
  const tweenFactor = useRef(0);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap!.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();

          emblaApi.slideNodes()[slideIndex]!.style.opacity = opacity;
        });
      });
    },
    []
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    onSelect(emblaApi);

    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("reInit", onSelect)
      .on("scroll", tweenOpacity)
      .on("select", onSelect)
      .on("slideFocus", tweenOpacity);
  }, [emblaApi, tweenOpacity, onSelect]);

  const { translations } = useTranslations();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const CONTENT: HemaCarouselItem[] = [
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-83.jpg`,
      title: translations.hema.content1.header,
      text: translations.hema.content1.paragraph,
      placement: "right" as textPlacement,
    },
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-161.jpg`,
      title: translations.hema.content2.header,
      text: translations.hema.content2.paragraph,
      placement: "left" as textPlacement,
    },
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-139.jpg`,
      title: translations.hema.content3.header,
      text: translations.hema.content3.paragraph,
      placement: "right" as textPlacement,
    },
    {
      imagePath: `${import.meta.env.BASE_URL}images/Serm-102.jpg`,
      title: translations.hema.content4.header,
      text: translations.hema.content4.paragraph,
      placement: "left" as textPlacement,
    },
  ];

  return (
    <section id="hema" className={classes.carousel} ref={emblaRef}>
      <div className={classes.container}>
        {CONTENT.map((item, index) => (
          <div className={classes.slide} key={index}>
            <img
              className={classes.image}
              src={item.imagePath}
              alt={`HEMA action ${index + 1}`}
            />
            <div
              className={`${classes["text-content"]} ${
                item.placement === "left"
                  ? classes["text-content--left"]
                  : classes["text-content--right"]
              }`}
            >
              <h3 className={classes.title}>{item.title}</h3>
              <p className={classes.text}>{item.text}</p>
            </div>
            {selectedIndex === index && (
              <>
                <button
                  className={`${classes.chevron} ${classes["chevron--left"]}`}
                  onClick={scrollPrev}
                  aria-label="Previous slide"
                >
                  <Icon
                    name="chevron-left"
                    size={40}
                    className={classes["chevron-icon"]}
                  />
                </button>
                <button
                  className={`${classes.chevron} ${classes["chevron--right"]}`}
                  onClick={scrollNext}
                  aria-label="Next slide"
                >
                  <Icon
                    name="chevron-right"
                    size={40}
                    className={classes["chevron-icon"]}
                  />
                </button>
                <div
                  className={`${classes["swipe-indicator"]} ${classes["swipe-indicator--left"]}`}
                >
                  <Icon
                    name="chevron-left"
                    size={32}
                    className={classes["chevron-icon"]}
                  />
                </div>
                <div
                  className={`${classes["swipe-indicator"]} ${classes["swipe-indicator--right"]}`}
                >
                  <Icon name="chevron-right" size={32} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HemaSection;
