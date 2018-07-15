import IntlElements from "intl-elements";
import "filament";
import { Elm } from "../dist/app.js";

const i18nKey = IntlElements.defineContext({
    defaultLocale: "en-US",
    defaultMessages: {
        "home.welcome": "Welcome!",
    },
    //includeLangSettings,
    supportedLocales: {
        "en": "en-US",
        "en-US": "en-US",
        "es": "es-ES",
        "es-ES": "es-ES",
    },
    loadTranslation: locale => Promise.resolve(
        {
            "home.welcome": "Bienvenido",
        }
        //JSON.parse(
        //    document.querySelector(`[data-intl-locale="${locale}"]`).innerText
        //)
    ),
    locale: "es-ES",
    //setDocumentLang,
});

const app = Elm.Filament.Home.init({
    flags: {
        i18nKey,
    },
});

console.log("Elm.Filament.Home", app);

