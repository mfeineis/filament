import { provide } from "rye-pagelet";

import { Elm } from "../dist/elm";

export const factory = (host, attrs) => {
    console.log("acme-suggestions.connected", host, attrs);

    const document = host.ownerDocument;
    //root.innerHTML = "<pre>rye-suggestions bla</pre>";

    // FIXME: How would the interop work with Elm through the custom element?
    const div = document.createElement("div");
    host.appendChild(div);
    const app = Elm.Main.embed(div, {});

    return {
        attributeChanged(name, oldValue, newValue) {
            console.log("acme-suggestions.attributeChanged", this, name, oldValue, newValue);
            // app.ports.somePort.send(...)
        },
    };

    //const it = document.createElement("div");
    //it.setAttribute("data-pagelet", "true");
    //it.innerHTML = "<pre>acme-suggestions</pre>";

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

provide("acme-suggestions", factory);
