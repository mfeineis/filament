// FIXME: Stupid globals...
/* global window, document */

import Rye from "./rye-core";
import setupRouter from "./router";
import { registration } from "./suggestions";

// FIXME: Make the bootstrapping bullet-proof
export function main(window, document) {
    const router = setupRouter(window);

    // Registering the widgets we want on the page
    registration(router.register);

    const it = document.createElement("router-fragment");
    it.setAttribute("userId", "katara");
    it.setAttribute("route", "suggestions/user");

    document.querySelector("body").appendChild(it);
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    main(window, document);
}

