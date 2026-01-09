import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import classes from "./TeamSection.module.css";
import { useTranslations } from "../../contexts/TranslationContext";
import Icon from "../_scaffolding/Icon/Icon";

const PROFILE_IMAGE_BY_ID: Record<string, string> = {
  slavo: `${import.meta.env.BASE_URL}images/slavo.png`,
  tomas: `${import.meta.env.BASE_URL}images/tomas.jpg`,
  miro: `${import.meta.env.BASE_URL}images/miro.jpg`,
  joxer: `${import.meta.env.BASE_URL}images/joxer.jpg`,
};

const TWEEN_FACTOR_BASE = 0.55;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const TeamSection = () => {
  const { translations } = useTranslations();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tweenFactor = useRef(0);

  const historySlides = translations.team.content.map((item) => ({
    id: item.id,
    text: item.paragraph,
    imagePath: PROFILE_IMAGE_BY_ID[item.id] ?? "",
  }));

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();
      const isScrollEvent = eventName === "scroll";

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
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

          api.slideNodes()[slideIndex]!.style.opacity = opacity;
        });
      });
    },
    []
  );

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
  }, [emblaApi, onSelect, setTweenFactor, tweenOpacity]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <section className={classes.wrapper} id="team">
      <h1 className={classes.header}>{translations.team.header}</h1>

      <div className={classes.sections}>
        <section className={classes["history-section"]}>
          <h2>{translations.team.historyTitle}</h2>
          <div className={classes.carousel} ref={emblaRef}>
            <div className={classes.container}>
              {historySlides.map((slide, index) => (
                <div className={classes.slide} key={index}>
                  <div className={classes["slide-inner"]}>
                    <img
                      className={classes.image}
                      src={slide.imagePath}
                      alt={`Club history ${slide.id}`}
                    />
                    <div className={classes["text-content"]}>
                      <p className={classes.text}>{slide.text}</p>
                      {historySlides.length > 1 && selectedIndex === index && (
                        <div className={classes["controls"]}>
                          {index !== 0 && (
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
                          )}
                          {index < historySlides.length - 1 && (
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
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={classes.pagination}
              aria-hidden={historySlides.length <= 1}
            >
              {historySlides.map((_, index) => (
                <span
                  key={index}
                  className={`${classes["pagination__dash"]} ${
                    index === selectedIndex
                      ? classes["pagination__dash--active"]
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={classes["second-section"]}>
        </section>
      </div>
    </section>
  );
};

export default TeamSection;
