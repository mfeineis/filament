import { map, pick, pipe, reduce } from "ramda";
import { provide } from "rye-pagelet";

import m from "mithril";

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
    console.log("acme-popular-products.props", props);

    const div = document.createElement("pre");
    root.appendChild(div);
    m.render(div, "Popular Products powered by Mithril");
};

provide("acme-popular-products", factory);
