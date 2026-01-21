import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import classes from "./TeamSection.module.css";
import { useTranslations } from "../../contexts/TranslationContext";
import Icon from "../_scaffolding/Icon/Icon";
import logoComplex from "/logo-complex.svg";

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
    axis: "x",
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
      <div className={classes["history-wrapper"]}>
        <div className={classes.intro}>
          <h2>{translations.team.historyTitle}</h2>
          <p>{translations.team.intro}</p>
        </div>
        <div className={classes["history-carousel-wrapper"]}>
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
                      <img
                        src={logoComplex}
                        alt="KŠC logo watermark"
                        className={classes["text-watermark"]}
                        aria-hidden="true"
                      />
                      <p className={classes.text}>{slide.text}</p>
                      {historySlides.length > 1 && index === selectedIndex && (
                        <>
                          <button
                            className={`${classes.chevron} ${
                              classes["chevron--left"]
                            } ${index === 0 ? classes["chevron--hidden"] : ""}`}
                            onClick={scrollPrev}
                            aria-label="Previous slide"
                            disabled={index === 0}
                          >
                            <Icon
                              name="chevron-left"
                              size={40}
                              className={classes["chevron-icon"]}
                            />
                          </button>
                          <button
                            className={`${classes.chevron} ${
                              classes["chevron--right"]
                            } ${
                              index === historySlides.length - 1
                                ? classes["chevron--hidden"]
                                : ""
                            }`}
                            onClick={scrollNext}
                            aria-label="Next slide"
                            disabled={index === historySlides.length - 1}
                          >
                            <Icon
                              name="chevron-right"
                              size={40}
                              className={classes["chevron-icon"]}
                            />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
