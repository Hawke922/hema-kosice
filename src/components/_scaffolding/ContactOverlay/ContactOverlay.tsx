import { siteConfig } from "../../../config/site";
import { useTranslations } from "../../../contexts/TranslationContext";

import classes from "./ContactOverlay.module.css";

const ContactOverlay = () => {
  const { translations } = useTranslations();
  const { contact } = siteConfig;

  return (
    <div className={classes["contact-overlay"]}>
      <h2 className={classes.title}>{translations.contact.title}</h2>
      <p className={classes.subtitle}>{translations.contact.subtitle}</p>

      <ul className={classes["contact-list"]}>
        <li className={classes["contact-item"]}>
          <div className={classes["icon-wrapper"]}>
            <img
              src={`${import.meta.env.BASE_URL}email-icon.svg`}
              alt="Email"
              className={classes["social-icon"]}
            />
          </div>
          <div className={classes["contact-info"]}>
            <span className={classes["contact-label"]}>
              {translations.contact.emailLabel}
            </span>
            <a
              href={`mailto:${contact.email}`}
              className={classes["contact-link"]}
            >
              {contact.email}
            </a>
          </div>
        </li>

        <li className={classes["contact-item"]}>
          <div className={classes["icon-wrapper"]}>
            <img
              src={`${import.meta.env.BASE_URL}mobile-icon.svg`}
              alt="Phone"
              className={classes["social-icon"]}
            />
          </div>
          <div className={classes["contact-info"]}>
            <span className={classes["contact-label"]}>
              {translations.contact.phoneLabel}
            </span>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className={classes["contact-link"]}
            >
              {contact.phone}
            </a>
          </div>
        </li>
      </ul>

      <div className={classes["social-links"]}>
        <a
          href={contact.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={classes["social-link"]}
        >
          <img
            src={`${import.meta.env.BASE_URL}facebook-icon.svg`}
            alt="Facebook"
            className={classes["social-icon"]}
          />
          Facebook
        </a>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={classes["social-link"]}
        >
          <img
            src={`${import.meta.env.BASE_URL}instagram-icon.svg`}
            alt="Instagram"
            className={classes["social-icon"]}
          />
          Instagram
        </a>
      </div>
    </div>
  );
};

export default ContactOverlay;
