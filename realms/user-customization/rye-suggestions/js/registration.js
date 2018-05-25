/* global fetch, window */
import { register } from "rye-pagelet-registry";

// FIXME: This could be generated or rather be used to generate
//        the final artifact. How do we make sure there is no
//        reference to the "real" widget in here?
register(({ declare }) => (

    // FIXME: Refine the API, do we need the explicit pagelet with a somewhat
    //        central pagelet registry?
    declare({
        element: "rye-suggestions",
        // FIXME: The initial API call should be used eventually
        init: ({ userId }) => (
            fetch(`https://example.org/api/suggestions/${userId}`, {
                headers: {
                    "X-Access-Token": window.localStorage.getItem("t"),
                },
            }).then(it => it.json())
        ),
        pagelet: "/pagelets/rye-suggestions.pagelet.js",
    })

));

