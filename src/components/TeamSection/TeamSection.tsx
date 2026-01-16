import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import classes from "./TeamSection.module.css";
import { useTranslations } from "../../contexts/TranslationContext";
import Icon from "../_scaffolding/Icon/Icon";
import { siteConfig } from "../../config/site";

const PROFILE_IMAGE_BY_ID: Record<string, string> = {
  slavo: `${import.meta.env.BASE_URL}images/slavo.png`,
  tomas: `${import.meta.env.BASE_URL}images/tomas.jpg`,
  miro: `${import.meta.env.BASE_URL}images/miro.jpg`,
  joxer: `${import.meta.env.BASE_URL}images/joxer.jpg`,
};

const ACTION_IMAGES: string[] = [
  `${import.meta.env.BASE_URL}images/Serm-83.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-161.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-139.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-102.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-83.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-161.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-139.jpg`,
  `${import.meta.env.BASE_URL}images/Serm-102.jpg`,
];

const TWEEN_FACTOR_BASE = 0.55;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const TeamSection = () => {
  const { translations } = useTranslations();

  const teamAction = translations.team.action as any;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    axis: "y",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [actionEmblaRef, actionEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });
  const [actionSelectedIndex, setActionSelectedIndex] = useState(0);

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

  const scrollToAction = useCallback(
    (index: number) => {
      if (actionEmblaApi) {
        actionEmblaApi.scrollTo(index);
      }
    },
    [actionEmblaApi]
  );

  useEffect(() => {
    if (!actionEmblaApi) return;

    const onSelectAction = (api: EmblaCarouselType) => {
      setActionSelectedIndex(api.selectedScrollSnap());
    };

    onSelectAction(actionEmblaApi);

    actionEmblaApi.on("reInit", onSelectAction).on("select", onSelectAction);
  }, [actionEmblaApi]);

  const facebook = siteConfig.contact.socials.find(
    (social) => social.id === "facebook"
  );
  const instagram = siteConfig.contact.socials.find(
    (social) => social.id === "instagram"
  );

  return (
    <section className={classes.wrapper} id="team">
      <h1 className={classes.header}>{translations.team.header}</h1>

      <div className={classes.sections}>
        <section className={classes["history-section"]}>
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
                        <p className={classes.text}>{slide.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {historySlides.length > 1 && (
              <div className={classes["carousel-controls"]}>
                <button
                  className={classes.chevron}
                  onClick={scrollPrev}
                  aria-label="Previous slide"
                  disabled={selectedIndex === 0}
                >
                  <Icon
                    name="chevron-up"
                    size={40}
                    className={classes["chevron-icon"]}
                  />
                </button>
                <button
                  className={classes.chevron}
                  onClick={scrollNext}
                  aria-label="Next slide"
                  disabled={selectedIndex === historySlides.length - 1}
                >
                  <Icon
                    name="chevron-down"
                    size={40}
                    className={classes["chevron-icon"]}
                  />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={classes["second-section"]}>
          <div className={classes.intro}>
            <h2>{teamAction.title}</h2>
            <p>{teamAction.description}</p>
          </div>

          <div className={classes["action-carousel-wrapper"]}>
            <div className={classes["action-carousel"]} ref={actionEmblaRef}>
              <div className={classes["action-container"]}>
                {ACTION_IMAGES.map((imagePath, index) => (
                  <div className={classes["action-slide"]} key={index}>
                    <img
                      className={classes["action-image"]}
                      src={imagePath}
                      alt={`KŠC in action ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.thumbnails}>
              {ACTION_IMAGES.map((imagePath, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${classes.thumbnail} ${
                    index === actionSelectedIndex
                      ? classes["thumbnail--active"]
                      : ""
                  }`}
                  onClick={() => scrollToAction(index)}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    className={classes["thumbnail-image"]}
                    src={imagePath}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <p className={classes["social-cta"]}>
            {teamAction.ctaPrefix}{" "}
            {facebook && (
              <a href={facebook.href} target="_blank" rel="noreferrer">
                {teamAction.ctaFacebook ?? facebook.label}
              </a>
            )}{" "}
            {teamAction.ctaAnd}{" "}
            {instagram && (
              <a href={instagram.href} target="_blank" rel="noreferrer">
                {teamAction.ctaInstagram ?? instagram.label}
              </a>
            )}
            .
          </p>
        </section>
      </div>
    </section>
  );
};

export default TeamSection;
