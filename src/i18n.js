import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import XHR from "i18next-xhr-backend";
import translations_en from "./translations/en";
import translations_vi from "./translations/vi";


export const LANGUAGE_ = "fr";
export const LANGUAGE_EN = "en";
i18n
    // .use(XHR)
    .use(LanguageDetector)
    .init({
        // we init with resources
        // lng:DEFAULT_LOCALE,
        // fallbackLng: DEFAULT_LOCALE,
        debug: false,
        defaultNS: "translations",
        interpolation: {
            escapeValue: false // not needed for react!!
        },
        resources: {
            en: {
                translations: translations_en
            },
            vi: {
                translations: translations_vi
            },
        },
        react: {
            wait: false,
            useSuspense: false
        }
    });

export default i18n;
