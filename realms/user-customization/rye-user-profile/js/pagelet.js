import { map, pick, pipe, reduce } from "ramda";
import { provide } from "rye-pagelet";

const getProps = pipe(
    map(pick(["name", "value"])),
    reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
    }, {})
);

export const factory = root => {
    const props = getProps(root.attributes);
    console.log("rye-user-profile.props", props);

    const document = root.ownerDocument;

    const tmpl = document.createElement("template");
    tmpl.innerHTML = `

        <pre>
            <slot name="avatar">Your Avatar</slot>
        </pre>
        <slot name="name">Your Name</slot>

    `;

    root.appendChild(tmpl.content);
};

provide("rye-user-profile", factory);
