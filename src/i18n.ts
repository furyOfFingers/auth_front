import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translationEn } from "../public/locales/en";
import { translationRu } from "../public/locales/ru";
import { LANGUAGE } from "./constants/common";

const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE);

i18n.use(initReactI18next).init({
  resources,
  lng: preferredLanguage || "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
