// The page needs to take care of polyfilling the environment to the necessary level
// FIXME: Find a nice way to provide only the necessary polyfills
import "../polyfills/custom-elements.js";
import "../polyfills/custom-event.js";

import Rye from "rye-core";
import "rye-suggestions";

// To include the actual pagelet into the initial payload we just
// pull the file and everything should work seamlessly
//import "rye-suggestions.pagelet";

export function setup(window, document) {

    const it = document.createElement("rye-suggestions");
    it.setAttribute("userId", "katara");

    document.querySelector("body").appendChild(it);

    const it2 = document.createElement("rye-suggestions");
    it2.setAttribute("userId", "aang");

    document.querySelector("body").appendChild(it2);
}

