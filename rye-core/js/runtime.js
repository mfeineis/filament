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

        meta.observe = meta.observe || [];

        state.elements[meta.element] = {
            meta,
        };

        customElements.define(meta.element, class extends HTMLElement {
            static get observedAttributes() {
                return meta.observe;
            }

            constructor() {
                super();

                this.proxy = null;
            }

            adoptedCallback() {
                this.proxy && this.proxy.adopted && this.proxy.adopted.call(this);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                this.proxy && this.proxy.attributeChanged && this.proxy.attributeChanged.call(this, name, oldValue, newValue);
            }

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
                requestPagelet(meta.element, factory => {
                    const attrs = {};

                    for (let name of meta.observe) {
                        attrs[name] = this.getAttribute(name);
                    }

                    // The factory itself acts as the `conntectedCallback`
                    this.proxy = factory(this, attrs);
                });
            }

            disconnectedCallback() {
                this.proxy && this.proxy.disconnected && this.proxy.disconnected.call(this);
                this.proxy = null;
            }
        });

        dispatchQueue(state, meta);
    };

    // TODO: This is actually not so bad but needs refinement
    const requestPagelet = (element, next) => {
        const registration = state.elements[element];

        //console.log("requestPagelet", element, registration);

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

