/* global Filament, fetch, window */

// FIXME: This could be generated or rather be used to generate
//        the final artifact. How do we make sure there is no
//        reference to the "real" widget in here?
Filament.declare("acme-suggestions", {
    // FIXME: The initial API call should be used eventually
    init: ({ userId }) => (
        fetch(`https://example.org/api/suggestions/${userId}`, {
            headers: {
                "X-Access-Token": window.localStorage.getItem("t"),
            },
        }).then(it => it.json())
    ),
    fragment: "/fragments/acme-suggestions.fragment.js",
    observe: ["userid"],
});

