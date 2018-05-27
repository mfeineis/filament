import { loader } from "./loader";
import { configureRuntime } from "./runtime";

const { customElements, document, setTimeout } = window;
const runtime = configureRuntime(loader.use.config, customElements, document, setTimeout);

const Api = loader;

// Providing the runtime dependency
Api.add("rye-core/runtime/v1", [], () => runtime);

if (typeof window !== "undefined") {
    // This global is unavoidable since that is our single point of entry
    window.Rye = window.Rye || Api;
} else {
    // FIXME: Mehhh... maybe use a suitable webpack library target for "rye-core"?
    module.exports = Api;
}
