/* global Rye */

import Vue from "vue";

export const factory = (host, attrs) => {
    console.log("acme-weather.attrs", host, attrs);

    const document = host.ownerDocument;
    const div = document.createElement("div");
    host.appendChild(div);

    const app = new Vue({
        data: {
            message: "Weather powered by Vue",
        },
        el: div,
        render(h) {
            return h("pre", this.message);
        },
    });
};

Rye.provide("acme-weather", factory);

