import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import translations_en from "./translations/en/translates";
import translations_de from "./translations/de/translates";
import translations_fr from "./translations/fr/translates";
import moment from "moment";


export const LANGUAGE_FR = "fr";
export const LANGUAGE_EN = "en";
moment.locale(DEFAULT_LOCALE);
i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        // we init with resources
        lng:DEFAULT_LOCALE,
        fallbackLng: DEFAULT_LOCALE,
        debug: false,
        defaultNS: "translations",
        interpolation: {
            escapeValue: false // not needed for react!!
        },
        resources: {
            en: {
                translations: translations_en
            },
            de: {
                translations: translations_de
            },
            fr: {
                translations: translations_fr
            }
        },
        react: {
            wait: false,
            useSuspense: false
        }
    });

export default i18n;
