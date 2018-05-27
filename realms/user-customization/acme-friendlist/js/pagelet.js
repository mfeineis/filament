/* global Rye */

import { createElement as h } from "react";
import { render } from "react-dom";

const App = () => h("pre", null, "Friendlist powered by React");

export const factory = (host, attrs) => {
    console.log("acme-friendlist.attrs", attrs);

    render(h(App, attrs), host);
};

Rye.provide("acme-friendlist", factory);
