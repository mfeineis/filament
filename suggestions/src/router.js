// FIXME: Stupid globals...
/* global Rye */

// FIXME: The router should probably be part of the loader bundle
//        acting as the single required dependency on any Rye page
export function configureRouter(customElements, document, setTimeout) {

    const state = {
        guid: 0,
        queue: [],
        routes: {},
    };

    // FIXME: OMG, please validate this thoroughly
    const validateMeta = meta => meta && meta.element && meta.fragment;

    // FIXME: Might not be necessary
    const nextTick = fn => setTimeout(fn, 0);

    // FIXME: Either make that more router-y or use props or sth.
    const matchesRoute = (meta, element) => meta.element === element;

    // FIXME: OMG, side-effects in a filter...
    const dispatchQueue = (state, meta) => {
        state.queue = state.queue.filter(({ element, next }) => {
            if (matchesRoute(meta, element)) {
                nextTick(() => {
                    requestWidget(state, element, next);
                });
                return false;
            }

            return true;
        });
    };

    // FIXME: Validation, validation, validation...
    const api = {
        declare: (meta) => {
            console.log('router.declare', meta);

            if (state.routes[meta.element]) {
                console.error(`router.declare: "${meta.element}" is already defined`);
                return;
            }

            if (!validateMeta(meta)) {
                console.error(`router.declare: meta for "${meta.element}" invalid`);
                return;
            }

            state.routes[meta.element] = {
                meta,
            };

            customElements.define(meta.element, class extends HTMLElement {
                connectedCallback() {
                    requestWidget(state, meta.element, factory => (
                        factory(this, document)
                    ));
                }
            });

            dispatchQueue(state, meta);
        },
    };

    // TODO: This is actually not so bad but needs refinement
    const requestWidget = (state, element, next) => {
        console.log("requestWidget", element);

        const registration = state.routes[element];
        console.log("  registration", registration);

        if (!registration) {
            console.warn(`router.requestWidget: widget not found`);
            state.queue.push({ timestamp: Date.now(), element, next });

            console.log(`router.state`, state);
            return;
        }

        const req = Rye.require.config({
            paths: {
                [registration.meta.element]: registration.meta.fragment.replace(/\.js$/, ''),
            },
        });

        req([registration.meta.element], next);
    };

    return api;
};

export const setup = ({ customElements, setTimeout }, document) => {
    const router = configureRouter(customElements, document, setTimeout);

    if (typeof Rye !== "undefined") {
        Rye.define("rye-core/router", [], () => router);
    }

    return router;
};

export default setup;
