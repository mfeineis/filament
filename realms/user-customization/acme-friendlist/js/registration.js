import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-friendlist",
        observe: ["userid"],
        pagelet: "/pagelets/acme-friendlist.pagelet.js",
    })

));
