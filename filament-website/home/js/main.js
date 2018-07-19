import IntlElements from "intl-elements";
import "filament";
import { Elm } from "../dist/app.js";

import "flmnt-getstarted";
//import "flmnt-getstarted.fragment";
import "flmnt-hello";
//import "flmnt-hello.fragment";

const i18nKey = IntlElements.defineContext({
    defaultLocale: "en-US",
    defaultMessages: {
        "story.moveBack": "Back",
        "story.moveForward": "Forward",
        "story.record": "Record",
        "story.record.stop": "Stop Recording",
        "welcome": "Welcome!",
    },
    //includeLangSettings,
    supportedLocales: {
        "de": "de-DE",
        "de-DE": "de-DE",
        "en": "en-US",
        "en-US": "en-US",
        //"es": "es-ES",
        //"es-ES": "es-ES",
    },
    loadTranslation: locale => Promise.resolve(
        {
            "story.moveBack": "Zurück",
            "story.moveForward": "Vorwärts",
            "story.record": "Aufnehmen",
            "story.record.stop": "Aufnahme stoppen",
            "welcome": "Willkommen!",
        }
        //JSON.parse(
        //    document.querySelector(`[data-intl-locale="${locale}"]`).innerText
        //)
    ),
    locale: "de-DE",
    //setDocumentLang,
});

const app = Elm.Filament.Home.init({
    flags: {
        i18nKey,
    },
});

console.log("Elm.Filament.Home", app);

