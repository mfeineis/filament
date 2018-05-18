import Rye from "./rye-core";
import setupRouter from "./router";
import { registration } from "./suggestions";

// FIXME: Make the bootstrapping bullet-proof
export function main(window, document) {
    const router = setupRouter(window, document);

    // Registering the widgets we want on the page
    registration(router);

    const it = document.createElement("rye-suggestions");
    it.setAttribute("userId", "katara");

    document.querySelector("body").appendChild(it);

    const it2 = document.createElement("rye-suggestions");
    it2.setAttribute("userId", "aang");

    document.querySelector("body").appendChild(it2);
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    main(window, document);
}

