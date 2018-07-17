import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

export default [
    {
        input: "js/declaration.js",
        output: {
            file: "../cdn/fragments/flmnt-hello.js",
            format: "iife",
        },
    },
    {
        input: "js/fragment.js",
        output: {
            file: "../cdn/fragments/flmnt-hello.fragment.js",
            format: "iife",
            name: "FlmntHello",
        },
        plugins: [
            nodeResolve(),
            commonjs({
                namedExports: {
                    // left-hand side can be an absolute path, a path
                    // relative to the current directory, or the name
                    // of a module in node_modules
                    './dist/app.js': ["Elm"],
                },
            }),
        ],
    },
];
