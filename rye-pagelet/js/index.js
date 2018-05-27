/* global Rye */

// FIXME: This validation should not be in the PROD build

export const provide = (name, factory) => {

    if (typeof name !== "string" || /^rye/.test(name) || !/\w+-[^-]+/.test(name)) {
        throw new Error(`Pagelet name "${name}" is not defined or invalid.`);
    }

    if (typeof factory !== "function" || factory.length < 1) {
        throw new Error([
            "Pagelet factory should receive at least one 'rootNode' dependency."
        ].join(" "));
    }

    Rye.add(name, [], () => factory);
};

