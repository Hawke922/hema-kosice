import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import classes from "./GallerySection.module.css";
import { useTranslations } from "../../contexts/TranslationContext";
import { siteConfig } from "../../config/site";

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

const GallerySection = () => {
  const { translations } = useTranslations();

  const teamAction = translations.team.action as any;

  const [actionEmblaRef, actionEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });
  const [actionSelectedIndex, setActionSelectedIndex] = useState(0);

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
    <section className={classes.wrapper} id="gallery">
      <h1 className={classes.header}>{teamAction.title}</h1>

      <div className={classes["gallery-wrapper"]}>
        <div className={classes.intro}>
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
      </div>
    </section>
  );
};

export default GallerySection;
