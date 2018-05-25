import { register } from "rye-pagelet-registry";

// FIXME: This could be generated or rather be used to generate
//        the final artifact. How do we make sure there is no
//        reference to the "real" widget in here?
register(({ declare }) => (

    // FIXME: Refine the API, do we need the explicit fragment with a somewhat
    //        central pagelet registry?
    declare({
        element: "rye-suggestions",
        fragment: "/pagelets/rye-suggestions.pagelet.js",
    })

));

