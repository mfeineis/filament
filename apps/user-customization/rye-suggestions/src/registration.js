// FIXME: It may be better to have an explicit module to register the pagelet instead
//        of the webpack loader magic.

// FIXME: This should be generated or rather be used to generate
//        the final artifact. How do we make sure there is no
//        reference to the "real" widget in here?
export const registration = ({ declare }) => (

    // FIXME: Refine the API
    declare({
        element: "rye-suggestions",
        fragment: "/pagelets/rye-suggestions.pagelet.js",
    })

);

