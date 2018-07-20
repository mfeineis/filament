import IntlElements from "intl-elements";
import "filament";
import { Elm } from "../dist/app.js";

import "flmnt-getstarted";
//import "flmnt-getstarted.fragment";
import "flmnt-hello";
//import "flmnt-hello.fragment";

const locale = "de-DE";
const i18nKey = IntlElements.defineContext({
    defaultLocale: "en-US",
    defaultMessages: {
        "story.moveBack": "Back",
        "story.moveForward": "Forward",
        "story.record": "Record",
        "story.record.stop": "Stop Recording",
        "switch.lang.to.de": "Zu Deutsch wechseln",
        "switch.lang.to.en": "Switch to English",
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
            "switch.lang.to.de": "Zu Deutsch wechseln",
            "switch.lang.to.en": "Switch to English",
            "welcome": "Willkommen!",
        }
        //JSON.parse(
        //    document.querySelector(`[data-intl-locale="${locale}"]`).innerText
        //)
    ),
    locale,
    //setDocumentLang,
});

const app = Elm.Filament.Home.init({
    flags: {
        i18nKey,
        locale,
    },
});

console.log("Elm.Filament.Home", app);

app.ports.changeLocale.subscribe(locale => {
    IntlElements.changeLocale(locale);

    // FIXME: It should be validated which locale has
    //        actually been picked
    app.ports.localeChanged.send(locale);
});

