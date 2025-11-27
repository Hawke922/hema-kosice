import { siteConfig } from "../../../config/site";
import { useTranslations } from "../../../contexts/TranslationContext";

import classes from "./ContactOverlay.module.css";

const ContactOverlay = () => {
  const { translations } = useTranslations();
  const { contact } = siteConfig;

  return (
    <div className={classes.contactOverlay}>
      <h2 className={classes.title}>{translations.contact.title}</h2>
      <p className={classes.subtitle}>{translations.contact.subtitle}</p>

      <ul className={classes.contactList}>
        <li className={classes.contactItem}>
          <div className={classes.iconWrapper}>
            <img
              src={`${import.meta.env.BASE_URL}email-icon.svg`}
              alt="Email"
              className={classes.socialIcon}
            />
          </div>
          <div className={classes.contactInfo}>
            <span className={classes.contactLabel}>
              {translations.contact.emailLabel}
            </span>
            <a href={`mailto:${contact.email}`} className={classes.contactLink}>
              {contact.email}
            </a>
          </div>
        </li>

        <li className={classes.contactItem}>
          <div className={classes.iconWrapper}>
            <img
              src={`${import.meta.env.BASE_URL}mobile-icon.svg`}
              alt="Phone"
              className={classes.socialIcon}
            />
          </div>
          <div className={classes.contactInfo}>
            <span className={classes.contactLabel}>
              {translations.contact.phoneLabel}
            </span>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className={classes.contactLink}
            >
              {contact.phone}
            </a>
          </div>
        </li>
      </ul>

      <div className={classes.socialLinks}>
        <a
          href={contact.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          <img
            src={`${import.meta.env.BASE_URL}facebook-icon.svg`}
            alt="Facebook"
            className={classes.socialIcon}
          />
          Facebook
        </a>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialLink}
        >
          <img
            src={`${import.meta.env.BASE_URL}instagram-icon.svg`}
            alt="Instagram"
            className={classes.socialIcon}
          />
          Instagram
        </a>
      </div>
    </div>
  );
};

export default ContactOverlay;
