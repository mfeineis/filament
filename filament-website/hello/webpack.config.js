const path = require("path");

const merge = require("webpack-merge");

const baseConfig = ({ rootDir }) => ({
    output: {
        path: path.resolve(rootDir, "../cdn/fragments/"),
    },
});

const declarationConfig = ({ rootDir }) => ({
    entry: path.resolve(rootDir, "./js/declaration.js"),
    output: {
        filename: "flmnt-hello.js?[hash]",
    },
});

const fragmentConfig = ({ rootDir }) => ({
    entry: path.resolve(rootDir, "./js/fragment.js"),
    output: {
        filename: "flmnt-hello.fragment.js?[hash]",
    },
});

module.exports = (env = {}, argv = {}) => {
    const { NODE_ENV } = process.env;
    const settings = {
        isDev: NODE_ENV === "development",
        isProd: NODE_ENV === "production",
        rootDir: __dirname,
    };

    if (env.verbose) {
        console.log("webpack.settings", settings);
    }

    const modeConfig = {
        mode: settings.isProd ? "production" : "development",
    };

    const finalConfig = [
        merge.smart(
            baseConfig(settings),
            declarationConfig(settings),
            modeConfig
        ),
        merge.smart(
            baseConfig(settings),
            fragmentConfig(settings),
            modeConfig
        ),
    ];

    if (env.verbose) {
        console.log("webpack.config", finalConfig);
    }

    return finalConfig;
};
