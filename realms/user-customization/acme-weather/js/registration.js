import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-weather",
        pagelet: "/pagelets/acme-weather.pagelet.js",
    })

));
