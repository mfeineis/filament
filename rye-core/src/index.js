import { loader } from "./loader";
import { configureRuntime } from "./runtime";

const { customElements, setTimeout } = window;
const runtime = configureRuntime(loader, customElements, setTimeout);

const Api = loader;

// Providing the runtime dependency
Api.define("rye-core/runtime/v1", [], () => runtime);

if (typeof window !== "undefined") {
    // This global is unavoidable since that is our single point of entry
    window.Rye = window.Rye || Api;
} else {
    // FIXME: Mehhh... maybe use a suitable webpack library target for "rye-core"?
    module.exports = Api;
}
