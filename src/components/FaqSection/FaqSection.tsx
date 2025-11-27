import { useState } from "react";
import { useTranslations } from "../../contexts/TranslationContext";
import Overlay from "../_scaffolding/Overlay/Overlay";
import ContactOverlay from "../_scaffolding/ContactOverlay/ContactOverlay";
import classes from "./FaqSection.module.css";

type FaqItem = {
  question: string;
  answer: string;
  keywords: string[];
};

const FaqSection = () => {
  const { translations } = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);

  const faqItems: FaqItem[] = translations.faq.questions;

  const filteredFaqs = faqItems.filter((item) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const questionMatch = item.question.toLowerCase().includes(query);
    const answerMatch = item.answer.toLowerCase().includes(query);
    const keywordMatch = item.keywords.some((keyword) =>
      keyword.toLowerCase().includes(query)
    );

    return questionMatch || answerMatch || keywordMatch;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className={classes.wrapper} id="faq">
      <h1 className={classes.header}>{translations.faq.header}</h1>

      <div className={classes["search-container"]}>
        <input
          id="faq-search"
          type="text"
          className={classes["search-input"]}
          placeholder={translations.faq.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search FAQ"
        />
        {searchQuery && (
          <button
            className={classes["clear-button"]}
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className={classes["faq-list"]}>
        {filteredFaqs.length === 0 ? (
          <div className={classes["no-results"]}>
            <p className={classes["no-results-contact"]}>
              {translations.faq.noResultsMessage}{" "}
              <button
                className={classes["contact-link"]}
                onClick={() => setIsContactOverlayOpen(true)}
              >
                {translations.faq.noResultsAction}
              </button>
            </p>
          </div>
        ) : (
          filteredFaqs.map((item, index) => (
            <div
              key={index}
              className={`${classes["faq-item"]} ${
                expandedIndex === index ? classes["faq-item--expanded"] : ""
              }`}
            >
              <button
                className={classes["faq-question"]}
                onClick={() => toggleExpand(index)}
                aria-expanded={expandedIndex === index}
              >
                <span>{item.question}</span>
                <span
                  className={`${classes["expand-icon"]} ${
                    expandedIndex === index
                      ? classes["expand-icon--rotated"]
                      : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`${classes["faq-answer-wrapper"]} ${
                  expandedIndex === index
                    ? classes["faq-answer-wrapper--expanded"]
                    : ""
                }`}
              >
                <div className={classes["faq-answer"]}>{item.answer}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <Overlay
        isOpen={isContactOverlayOpen}
        onClose={() => setIsContactOverlayOpen(false)}
      >
        <ContactOverlay />
      </Overlay>
    </section>
  );
};

export default FaqSection;
