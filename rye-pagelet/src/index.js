/* global Rye */
// FIXME: Maybe we should add "rye-core" as an explicit but external dependency?

export const define = (name, factory) => {

    if (typeof name !== "string" || !/rye-[\w]+/.test(name)) {
        throw new Error("Pagelet name is not defined or invalid.");
    }

    if (typeof factory !== "function" || factory.length < 1) {
        throw new Error([
            "Pagelet factory should receive at least one 'rootNode' dependency."
        ].join(" "));
    }

    Rye.define(name, [], () => factory);
};

