import { loader } from "./loader";
import { configureRouter } from "./router";

const { customElements, document, setTimeout } = window;
const router = configureRouter(customElements, document, setTimeout);

const Api = loader;

// FIXME: Find something better than "rye-core/router" because it's not a really
//        a router anymore...
Api.define("rye-core/router", [], () => router);

if (typeof window !== "undefined") {
    // This global is unavoidable since that is our single point of entry
    window.Rye = window.Rye || Api;
} else {
    // FIXME: Mehhh... maybe use a suitable webpack library target for "rye-core"?
    module.exports = Api;
}
