import { enhance } from "rye-pagelet-registry";

enhance(({ define }) => (

    define({
        element: "acme-user-profile",
        observe: ["userid"],
        pagelet: "/pagelets/acme-user-profile.pagelet.js",
    })

));
