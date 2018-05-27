/* global Rye */

export const factory = (host, attrs) => {
    console.log("acme-user-profile.props", host, attrs);

    const document = host.ownerDocument;

    const tmpl = document.createElement("template");
    tmpl.innerHTML = "<pre>User Profile powered by Vanilla JS</pre>";
    host.appendChild(tmpl.content);
};

Rye.provide("acme-user-profile", factory);

