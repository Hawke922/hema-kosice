import { useTranslations } from "../../contexts/TranslationContext";
import { siteConfig } from "../../config/site";
import classes from "./Footer.module.css";

const Footer = () => {
  const { translations } = useTranslations();
  const t = translations.footer;
  const { organization, contact, training, documents } = siteConfig;

  return (
    <footer className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.section}>
          <h4>{organization.legalName}</h4>
          <p className={classes.label}>{t.organization.type}</p>
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
            <a href={`mailto:${contact.email}`} className={classes.link}>
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className={classes.link}
            >
              {contact.phone}
            </a>
          </div>
          <div className={classes["social-links"]}>
            <a
              href={contact.facebook}
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src="/facebook-icon.svg"
                alt="Facebook"
                className={classes.icon}
              />
            </a>
            <a
              href={contact.instagram}
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="/instagram-icon.svg"
                alt="Instagram"
                className={classes.icon}
              />
            </a>
          </div>
        </div>

        <div className={classes.section}>
          <h4>{t.training.title}</h4>
          <div className={classes["info-group"]}>
            <p>{training.hallName}</p>
            <p className={classes.address}>{training.hallAddress}</p>
            <p className={classes.schedule}>
              {t.training.scheduleLabel}: {training.schedule}
            </p>
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
        <div className={classes["bottom-links"]}>
          <a href="#" className={classes.link}>
            {t.legal.privacy}
          </a>
          <span className={classes.separator}>•</span>
          <a href="#" className={classes.link}>
            {t.legal.terms}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
