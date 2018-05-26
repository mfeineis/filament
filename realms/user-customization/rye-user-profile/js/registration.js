import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "rye-user-profile",
        pagelet: "/pagelets/rye-user-profile.pagelet.js",
    })

));
