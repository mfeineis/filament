import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-friendlist",
        pagelet: "/pagelets/acme-friendlist.pagelet.js",
    })

));
