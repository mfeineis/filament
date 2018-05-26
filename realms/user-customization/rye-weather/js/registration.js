import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "rye-weather",
        pagelet: "/pagelets/rye-weather.pagelet.js",
    })

));
