/* global module */

// FIXME: this should be somewhat safer
module.exports = function (content, map, meta) {

    // FIXME: Better error messages! What is a valid name?
    // FIXME: Validation can be done at assembly time!

    if (!/pagelet\.jsx?/.test(this.resource)) {
        //console.log("widgetLoader.skip", this.resource);
        throw new Error("A pagelet needs to have 'pagelet' in its filename.");
    }

    //console.log("widgetLoader.transform", this.resource);
    //console.log("->", this.context);

    return content + `

if (typeof PAGELET_NAME !== "string" || !/rye-[\\w]+/.test(PAGELET_NAME)) {
    throw new Error("PAGELET_NAME is not defined or invalid.");
}

if (typeof pageletFactory !== "function" || pageletFactory.length < 1) {
    throw new Error([
        "pageletFactory should receive at least one 'rootNode' dependency."
    ].join(" "));
}

Rye.define(PAGELET_NAME, [], () => pageletFactory);

    `;
};

