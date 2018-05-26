import { register } from "rye-pagelet-registry";

register(({ declare }) => (

    declare({
        element: "rye-user-profile",
        pagelet: "/pagelets/rye-user-profile.pagelet.js",
    })

));
