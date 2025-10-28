import { createContext, useContext, useState } from "react";
import en from "../locales/en.json";
import sk from "../locales/sk.json";

type Language = "en" | "sk";
type Translations = typeof en;

type TranslationsContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
};

const translations: Record<Language, Translations> = {
  en,
  sk,
};

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
);

export const TranslationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <TranslationsContext.Provider
      value={{
        language,
        setLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationsContext)!;
