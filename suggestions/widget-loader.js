
// FIXME: this should be somewhat safer
module.exports = function (content, map, meta) {

    if (!/\.widget\.jsx?/.test(this.resource)) {
        //console.log("widgetLoader.skip", this.resource);
        return content;
    }

    //console.log("widgetLoader.transform", this.resource);
    //console.log("->", this.context);

    return content + `

if (typeof Rye !== "undefined") {
    Rye.define(WIDGET_NAME, [], () => widgetFactory);
}

    `;
};
