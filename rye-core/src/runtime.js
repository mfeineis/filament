// FIXME: OMG, please validate this thoroughly
export const validateMeta = meta => meta && meta.element && meta.pagelet;

export function configureRuntime(configureLoader, customElements, setTimeout) {

    const state = {
        elements: {},
        queue: [],
    };

    // FIXME: OMG, side-effects in a filter...
    const dispatchQueue = meta => {
        state.queue = state.queue.filter(({ element, next }) => {
            if (meta.element === element) {
                setTimeout(() => requestPagelet(element, next), 0);
                return false;
            }

            return true;
        });
    };

    // FIXME: Validation, validation, validation...
    const define = meta => {
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
                // FIXME
                // Should we provide a default loading indicator
                // for the time it takes to load the pagelet.
                // A placeholder would be better but how does
                // the loader know what to display? Maybe this is
                // something a registration could provide optionally.
                // After the pagelet factory is called the pagelet
                // itself can take over.
                requestPagelet(meta.element, factory => (
                    factory(this)
                ));
            }
        });

        dispatchQueue(state, meta);
    };

    // TODO: This is actually not so bad but needs refinement
    const requestPagelet = (element, next) => {
        console.log("requestPagelet", element);

        const registration = state.elements[element];
        console.log("  registration", registration);

        if (!registration) {
            console.warn(`runtime.requestPagelet: widget not found`);
            state.queue.push({ timestamp: Date.now(), element, next });

            console.log(`runtime.state`, state);
            return;
        }

        const use = configureLoader({
            paths: {
                [registration.meta.element]: registration.meta.pagelet.replace(/\.js$/, ''),
            },
        });

        use([registration.meta.element], next);
    };

    return {
        define,
    };
};

