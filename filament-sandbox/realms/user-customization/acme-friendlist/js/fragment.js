/* global Filament */

import { createElement as h } from "react";
import { render } from "react-dom";

const App = () => h("pre", null, "Friendlist powered by React");

export const factory = (host, attrs) => {
    console.log("acme-friendlist.attrs", attrs);

    render(h(App, attrs), host);
};

Filament.provide("acme-friendlist", factory);
