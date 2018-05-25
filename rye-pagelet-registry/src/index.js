/* global Rye */

export const register = factory => {

    if (typeof factory !== "function" || factory.length < 1) {
        // FIXME: Better error messages! What do we need exactly?
        throw new Error([
            "It should provide a valid registration function.",
        ].join(" "));
    }

    Rye.require(["rye-core/runtime/v1"], factory);
};

