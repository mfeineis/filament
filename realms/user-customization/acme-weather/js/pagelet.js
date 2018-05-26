import { map, pick, pipe, reduce } from "ramda";
import Vue from "vue";

import { provide } from "rye-pagelet";

const getProps = pipe(
    map(pick(["name", "value"])),
    reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
    }, {})
);

export const factory = root => {
    const document = root.ownerDocument;

    const props = getProps(root.attributes);
    console.log("acme-weather.props", props);

    const div = document.createElement("div");
    root.appendChild(div);

    const app = new Vue({
        data: {
            message: "Weather powered by Vue",
        },
        el: div,
        render(h) {
            return h("pre", this.message);
        },
    });
};

provide("acme-weather", factory);
