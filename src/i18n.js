import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translations_en from "./translations/en";
import translations_vi from "./translations/vi";
import {LANGUAGE_EN, LANGUAGE_VI} from "./constants/constants";


const language_translate = localStorage.getItem("language_translate") && [LANGUAGE_EN, LANGUAGE_VI].includes(JSON.parse(localStorage.getItem("language_translate"))) ? JSON.parse(localStorage.getItem("language_translate")) : null;

console.log(language_translate);
i18n
    // .use(XHR)
    .use(LanguageDetector)
    .init({
        // we init with resources
        lng:language_translate,
        fallbackLng: [
            LANGUAGE_EN,
            LANGUAGE_VI
        ],
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
