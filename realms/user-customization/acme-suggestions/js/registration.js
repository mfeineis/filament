/* global fetch, window */
import { enhance } from "rye-pagelet-registry";

// FIXME: This could be generated or rather be used to generate
//        the final artifact. How do we make sure there is no
//        reference to the "real" widget in here?
enhance(({ define }) => (

    // FIXME: Refine the API, do we need the explicit pagelet with a somewhat
    //        central pagelet registry?
    define({
        element: "acme-suggestions",
        // FIXME: The initial API call should be used eventually
        init: ({ userId }) => (
            fetch(`https://example.org/api/suggestions/${userId}`, {
                headers: {
                    "X-Access-Token": window.localStorage.getItem("t"),
                },
            }).then(it => it.json())
        ),
        observe: ["userid"],
        pagelet: "/pagelets/acme-suggestions.pagelet.js",
    })

));

