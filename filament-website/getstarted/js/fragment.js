/* global Filament, IntlElements */

const i18nKey = IntlElements.defineContext({
    defaultLocale: "en-US",
    defaultMessages: {
        "home.welcome": "Welcome Filament.GetStarted",
    },
});

export const factory = (host, attrs) => {
    const document = host.ownerDocument;

    const root = document.createElement("intl-context");
    root.setAttribute("context-key", i18nKey);

    const welcome = document.createElement("intl-element");
    welcome.setAttribute("intl", JSON.stringify({
        key: "home.welcome",
    }));

    root.appendChild(welcome);
    host.appendChild(root);
};

Filament.provide("flmnt-getstarted", factory);

