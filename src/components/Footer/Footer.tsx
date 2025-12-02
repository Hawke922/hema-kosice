import { useTranslations } from "../../contexts/TranslationContext";
import { siteConfig } from "../../config/site";
import classes from "./Footer.module.css";

const Footer = () => {
  const { translations } = useTranslations();
  const t = translations.footer;
  const { organization, contact, training, documents } = siteConfig;
  const contactOptions = contact.options ?? [];
  const socialLinks = contact.socials ?? [];
  const scheduleEntries = Array.isArray(training.schedule)
    ? training.schedule
    : training.schedule
    ? [training.schedule]
    : [];

  return (
    <footer className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.section}>
          <div>
            <h4>{organization.legalName}</h4>
            <p className={classes.label}>{t.organization.type}</p>
          </div>
          <div className={classes["info-group"]}>
            <p>
              {t.organization.icoLabel}: {organization.ico}
            </p>
            <p>{t.organization.addressLabel}:</p>
            <p className={classes.address}>{organization.address}</p>
          </div>
        </div>

        <div className={classes.section}>
          <h4>{t.contact.title}</h4>
          <div className={classes["info-group"]}>
            {contactOptions.map((option) => (
              <a key={option.id} href={option.href} className={classes.link}>
                {option.display}
              </a>
            ))}
          </div>
          <div className={classes["social-links"]}>
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.alt}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${social.icon}`}
                  alt={social.alt}
                  className={classes.icon}
                />
              </a>
            ))}
          </div>
        </div>

        <div className={classes.section}>
          <h4>{t.training.title}</h4>
          <div className={classes["info-group"]}>
            <p className={classes["hall-name"]}>{training.hallName}</p>
            <a
              href={training.mapLink}
              className={`${classes.address} ${classes.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {training.hallAddress}
            </a>
            <div>
              <p className={classes.schedule}>{t.training.scheduleLabel}:</p>
              <ul className={classes.scheduleList}>
                {scheduleEntries.map((slot) => (
                  <li key={slot} className={classes.scheduleItem}>
                    {slot}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={classes.section}>
          <h4>{t.documents.title}</h4>
          <div className={classes["info-group"]}>
            <a href={documents.bylaws} className={classes.link} download>
              📄 {t.documents.bylaws}
            </a>
            <a href={documents.registration} className={classes.link} download>
              📄 {t.documents.registration}
            </a>
            <a href={documents.tax} className={classes.link}>
              📄 {t.documents.tax}
            </a>
          </div>
        </div>

        <div className={classes.section}>
          <h4>{t.partners.title}</h4>
          <div className={classes.partners}>
            <p className={classes["partners-placeholder"]}>[loga partnerov]</p>
          </div>
        </div>
      </div>

      <div className={classes.bottom}>
        <p className={classes.copyright}>
          © {new Date().getFullYear()} {organization.legalName}.{" "}
          {t.legal.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
