import { register } from "rye-pagelet-registry";

register(({ declare }) => (

    declare({
        element: "rye-friendlist",
        pagelet: "/pagelets/rye-friendlist.pagelet.js",
    })

));
