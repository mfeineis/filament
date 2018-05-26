import { map, pick, pipe, reduce } from "ramda";
import { createElement as h } from "react";
import { render } from "react-dom";
import { provide } from "rye-pagelet";

const getProps = pipe(
    map(pick(["name", "value"])),
    reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
    }, {})
);

const App = () => h("pre", null, "Friendlist powered by React");

export const factory = root => {
    const document = root.ownerDocument;

    const props = getProps(root.attributes);
    console.log("acme-friendlist.props", props);

    render(h(App), root);
};

provide("acme-friendlist", factory);
