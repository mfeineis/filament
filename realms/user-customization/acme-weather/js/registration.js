import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-weather",
        observe: ["userid"],
        pagelet: "/pagelets/acme-weather.pagelet.js",
    })

));
