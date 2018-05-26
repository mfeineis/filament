// FIXME: OMG, please validate this thoroughly
export const validateMeta = meta => meta && meta.element && meta.pagelet;

export function configureRuntime(configRequire, customElements, setTimeout) {

    const state = {
        elements: {},
        queue: [],
    };

    // FIXME: OMG, side-effects in a filter...
    const dispatchQueue = (state, meta) => {
        state.queue = state.queue.filter(({ element, next }) => {
            if (meta.element === element) {
                setTimeout(() => (
                    requestPagelet(state, element, next)
                ), 0);
                return false;
            }

            return true;
        });
    };

    // FIXME: Validation, validation, validation...
    const api = {
        declare: (meta) => {
            console.log('runtime.declare', meta);

            if (state.elements[meta.element]) {
                console.error(`runtime.declare: "${meta.element}" is already defined`);
                return;
            }

            if (!validateMeta(meta)) {
                console.error(`runtime.declare: meta for "${meta.element}" invalid`);
                return;
            }

            state.elements[meta.element] = {
                meta,
            };

            customElements.define(meta.element, class extends HTMLElement {
                // FIXME: This should probably clean up after itself
                connectedCallback() {
                    requestPagelet(state, meta.element, factory => (
                        factory(this)
                    ));
                }
            });

            dispatchQueue(state, meta);
        },
    };

    // TODO: This is actually not so bad but needs refinement
    const requestPagelet = (state, element, next) => {
        console.log("requestPagelet", element);

        const registration = state.elements[element];
        console.log("  registration", registration);

        if (!registration) {
            console.warn(`runtime.requestPagelet: widget not found`);
            state.queue.push({ timestamp: Date.now(), element, next });

            console.log(`runtime.state`, state);
            return;
        }

        const require = configRequire({
            paths: {
                [registration.meta.element]: registration.meta.pagelet.replace(/\.js$/, ''),
            },
        });

        require([registration.meta.element], next);
    };

    return api;
};

