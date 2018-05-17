// FIXME: Stupid globals...
/* global Rye */

// FIXME: The router should probably be part of the loader bundle
//        acting as the single required dependency on any Rye page
export function configureRouter(customElements, setTimeout) {

    const state = {
        guid: 0,
        queue: [],
        routes: {},
    };

    // FIXME: OMG, please validate this thoroughly
    const validateMeta = meta => meta && meta.fragment && meta.module && meta.route;

    // FIXME: Might not be necessary
    const nextTick = fn => setTimeout(fn, 0);

    // FIXME: Either make that more router-y or use props or sth.
    const matchesRoute = (meta, route) => meta.route === route;

    // FIXME: OMG, side-effects in a filter...
    const dispatchQueue = (state, meta) => {
        state.queue = state.queue.filter(({ route, next }) => {
            if (matchesRoute(meta, route)) {
                nextTick(() => {
                    requestWidget(state, route, next);
                });
                return false;
            }

            return true;
        });
    };

    // FIXME: Validation, validation, validation...
    const api = {
        register(meta) {
            console.log('router.register', meta);

            if (state.routes[meta.route]) {
                console.error(`router.register: "${meta.route}" is already defined`);
                return;
            }

            if (!validateMeta(meta)) {
                console.error(`router.register: meta for "${meta.route}" invalid`);
                return;
            }

            state.routes[meta.route] = {
                meta,
            };

            dispatchQueue(state, meta);
        },
    };

    // TODO: This is actually not so bad but needs refinement
    const requestWidget = (state, route, next) => {
        console.log("requestWidget", route);

        const registration = state.routes[route];
        console.log("  registration", registration);

        if (!registration) {
            console.warn(`router.requestWidget: widget not found`);
            state.queue.push({ timestamp: Date.now(), route, next });

            console.log(`router.state`, state);
            return;
        }

        const req = Rye.require.config({
            paths: {
                [registration.meta.module]: registration.meta.fragment.replace(/\.js$/, ''),
            },
        });

        req([registration.meta.module], next);
    };

    // FIXME: Do we use props of the element and/or a route abstraction?
    //        The API needs to be streamlined but the approach is quite
    //        elegant, thanks to the "enhance" concept.
    customElements.define('router-fragment', class extends HTMLElement {
        constructor() {
            super();

            state.guid += 1;
        }

        connectedCallback() {
            this.id = `rf-${state.guid}-${Date.now()}`;
            this.isDisposed = false;

            const route = this.getAttribute("route");
            console.log("connected", route, this.id, this);

            const root = document.createElement("div");
            this.appendChild(root);

            requestWidget(state, route, factory => {

                if (this.isDisposed) {
                    console.log(`router.requestWidget: widget ${this.id} is disposed`);
                    return;
                }

                factory(root, { id: this.id });
            });
        }

        disconnectedCallback() {
            this.isDisposed = true;
        }
    });

    return api;
};

export const setup = ({ customElements, setTimeout }) => {
    const router = configureRouter(customElements, setTimeout);

    Rye.define("core/router", [], () => router);

    return router;
};

export default setup;
