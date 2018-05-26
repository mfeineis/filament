import { register } from "rye-pagelet-registry";

register(({ declare }) => (

    declare({
        element: "rye-popular-products",
        pagelet: "/pagelets/rye-popular-products.pagelet.js",
    })

));
