// ---
// fragment: "src/index.js",
// module: "rye-suggestions",
// route: "suggestions/:user",
// ---

/* global define */
import fetch from "isomorphic-fetch";

export const registration = ({ register }) => (
    register({
        fragment: "src/index.js",
        module: "rye-suggestions",
        route: "suggestions/:user",
    })
);

const factory = (document) => {
    return (root, { id }) => {
        console.log("rye-suggestions", root, id, document, fetch);
        root.innerHTML = "<pre>rye-suggestions</pre>";
    };
};

define("rye-suggestions", ["env/document"], factory);

export const meta = {
    fragment: "src/index.js",
    module: "rye-suggestions",
    route: "suggestions/:user",
};

export const widget = {
    id: "rye-suggestions",
    dependencies: ["env/document"],
    factory: factory,
};
