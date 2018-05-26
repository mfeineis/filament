import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-popular-products",
        pagelet: "/pagelets/acme-popular-products.pagelet.js",
    })

));
