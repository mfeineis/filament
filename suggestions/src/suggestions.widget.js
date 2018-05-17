/* global Rye */// Stupid global...

import fetch from "isomorphic-fetch";

// FIXME: Find an easy naming scheme to enable automated packaging
export const widgetFactory = () => {
    return (root, { id }) => {
        console.log("rye-suggestions", root, id, document, fetch);
        root.innerHTML = "<pre>rye-suggestions</pre>";
    };
};

// FIXME: This can be added in a build step, no need to maintain
//        the name and mapping by hand. Should probably be done
//        at the same time as assembling the registration
Rye.define("rye-suggestions", [], widgetFactory);

