import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "rye-friendlist",
        pagelet: "/pagelets/rye-friendlist.pagelet.js",
    })

));
