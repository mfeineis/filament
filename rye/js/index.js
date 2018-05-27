import { add, use } from "./loader";
import { configureRuntime } from "./runtime";

const { customElements, setTimeout } = window;
const { declare } = configureRuntime(use.config, customElements, setTimeout);

const Api = {
    declare: (name, config) => {
        // FIXME: Should the config be a factory?
        config.element = name;
        declare(config);
    },
    provide: (name, factory) => {
        // FIXME: Do we need dependency handling here?
        add(name, [], () => factory);
    },
};

if (typeof window !== "undefined") {
    // This global is unavoidable since that is our single point of entry
    window.Rye = window.Rye || Api;
} else {
    // FIXME: Mehhh... maybe use a suitable webpack library target for "rye-core"?
    module.exports = Api;
}
