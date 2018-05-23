/* global module */

// FIXME: this should be somewhat safer
module.exports = function (content, map, meta) {

    // FIXME: Better error messages! What is a valid name?
    // FIXME: Validation can be done at assembly time!

    return content + `

if (typeof registration === "undefined" || registration.length < 1) {
    // FIXME: Better error messages! What do we need exactly?
    throw new Error([
        "It should provide a valid registration function.",
    ].join(" "));
}

Rye.require(["rye-core/router"], registration);

    `;
};

