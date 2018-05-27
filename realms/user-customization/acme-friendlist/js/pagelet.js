import { createElement as h } from "react";
import { render } from "react-dom";
import { provide } from "rye-pagelet";

const App = () => h("pre", null, "Friendlist powered by React");

export const factory = (host, attrs) => {
    console.log("acme-friendlist.attrs", attrs);

    render(h(App, attrs), host);
};

provide("acme-friendlist", factory);
