import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "rye-popular-products",
        pagelet: "/pagelets/rye-popular-products.pagelet.js",
    })

));
