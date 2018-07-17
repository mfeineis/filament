/* global Filament, IntlElements */
//import { Elm } from "../dist/app";
import "../dist/app";

const i18nKey = IntlElements.defineContext({
    defaultLocale: "en-US",
    defaultMessages: {
        "hello.welcome": "Welcome App.Hello",
    },
});

export const factory = (host, attrs) => {
    const document = host.ownerDocument;

    const root = document.createElement("div");
    host.appendChild(root);

    const app = window.Elm.App.Hello.init({
        flags: i18nKey,
        node: root,
    });

    console.log("hello", app);

    const fromFn = it => console.log("fromElm", it);
    app.ports.fromElm.subscribe(fromFn);

    return {
        disconnected: it => {
            app.ports.fromElm.unsubscribe(fromFn);
        },
    };
};

Filament.provide("flmnt-hello", factory);

