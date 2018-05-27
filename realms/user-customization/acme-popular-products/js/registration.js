import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-popular-products",
        observe: ["userid"],
        pagelet: "/pagelets/acme-popular-products.pagelet.js",
    })

));
