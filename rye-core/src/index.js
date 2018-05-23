import { loader } from "./loader";
import { configureRouter } from "./router";

const { customElements, document, setTimeout } = window;
const router = configureRouter(customElements, document, setTimeout);

const Api = loader;

// FIXME: Find something better than "rye-core/router" because it's not a really
//        a router anymore...
Api.define("rye-core/router", [], () => router);

if (typeof window !== "undefined") {
    // FIXME: This one global is probably unavoidable but it would be nice to have the
    //        router live alongside the loader and have that as the single platform
    //        dependency.
    window.Rye = window.Rye || Api;
} else {
    // FIXME: Mehhh...
    module.exports = Api;
}
