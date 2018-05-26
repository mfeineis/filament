import { register } from "rye-pagelet-registry";

register(({ declare }) => (

    declare({
        element: "rye-weather",
        pagelet: "/pagelets/rye-weather.pagelet.js",
    })

));
