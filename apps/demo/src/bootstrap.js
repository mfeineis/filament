import Rye from "rye-core";
import "rye-suggestions";

// FIXME: Make the bootstrapping bullet-proof
export function setup(window, document) {

    const it = document.createElement("rye-suggestions");
    it.setAttribute("userId", "katara");

    document.querySelector("body").appendChild(it);

    const it2 = document.createElement("rye-suggestions");
    it2.setAttribute("userId", "aang");

    document.querySelector("body").appendChild(it2);
}

