import { provide } from "rye-pagelet";

import { Elm } from "../dist/elm";

export const factory = root => {
    //const document = root.ownerDocument;
    //root.innerHTML = "<pre>rye-suggestions bla</pre>";

    // FIXME: How would the interop work with Elm through the custom element?
    const app = Elm.Main.embed(root, {});

    //const it = document.createElement("div");
    //it.setAttribute("data-pagelet", "true");
    //it.innerHTML = "<pre>rye-suggestions</pre>";

    //const one = document.createElement("span");
    //one.setAttribute("data-id", "1");

    //const two = document.createElement("span");
    //two.setAttribute("data-id", "2");

    //const nodes = [it, one, two];
    //nodes.forEach(node => root.appendChild(node));

    //root.parentNode.replaceChild(it, root);

    //nodes.reverse().forEach(node => (
    //    it.parentNode.insertBefore(node, it.nextSibling)
    //));
};

provide("rye-suggestions", factory);
