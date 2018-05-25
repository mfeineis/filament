
export function configureRuntime(loader, customElements, document, setTimeout) {

    const state = {
        guid: 0,
        queue: [],
        routes: {},
    };

    // FIXME: OMG, please validate this thoroughly
    const validateMeta = meta => meta && meta.element && meta.pagelet;

    // FIXME: Might not be necessary
    const nextTick = fn => setTimeout(fn, 0);

    // FIXME: OMG, side-effects in a filter...
    const dispatchQueue = (state, meta) => {
        state.queue = state.queue.filter(({ element, next }) => {
            if (meta.element === element) {
                nextTick(() => {
                    requestPagelet(state, element, next);
                });
                return false;
            }

            return true;
        });
    };

    // FIXME: Validation, validation, validation...
    const api = {
        declare: (meta) => {
            console.log('runtime.declare', meta);

            if (state.routes[meta.element]) {
                console.error(`runtime.declare: "${meta.element}" is already defined`);
                return;
            }

            if (!validateMeta(meta)) {
                console.error(`runtime.declare: meta for "${meta.element}" invalid`);
                return;
            }

            state.routes[meta.element] = {
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

        const registration = state.routes[element];
        console.log("  registration", registration);

        if (!registration) {
            console.warn(`runtime.requestPagelet: widget not found`);
            state.queue.push({ timestamp: Date.now(), element, next });

            console.log(`runtime.state`, state);
            return;
        }

        const req = loader.require.config({
            paths: {
                [registration.meta.element]: registration.meta.pagelet.replace(/\.js$/, ''),
            },
        });

        req([registration.meta.element], next);
    };

    return api;
};

