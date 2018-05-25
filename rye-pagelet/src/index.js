/* global Rye */

// FIXME: This validation should not be in the PROD build

const reserved = {
    "rye-core": true,
    "rye-pagelet": true,
    "rye-pagelet-registry": true,
};

export const define = (name, factory) => {

    if (typeof name !== "string" || !/rye-[\w]+/.test(name) || name in reserved) {
        throw new Error("Pagelet name is not defined or invalid.");
    }

    if (typeof factory !== "function" || factory.length < 1) {
        throw new Error([
            "Pagelet factory should receive at least one 'rootNode' dependency."
        ].join(" "));
    }

    Rye.define(name, [], () => factory);
};

