/* global Filament */

import m from "mithril";

export const factory = (host, attrs) => {
    console.log("acme-popular-products.attrs", attrs);

    const document = host.ownerDocument;
    const div = document.createElement("pre");
    host.appendChild(div);
    m.render(div, "Popular Products powered by Mithril");
};

Filament.provide("acme-popular-products", factory);
