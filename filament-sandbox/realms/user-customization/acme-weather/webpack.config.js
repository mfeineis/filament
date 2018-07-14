const path = require("path");

const { HotModuleReplacementPlugin } = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devConfig = ({ isDev }) => {
    if (!isDev) {
        return {
            // FIXME: Remove devtool in PROD
            devtool: "sourcemap",
        };
    }

    return {
        devServer: {
            historyApiFallback: true,
            host: "0.0.0.0",
            hot: true,
            inline: true,
        },
        devtool: 'inline-source-map',
        plugins: [
            new HtmlWebpackPlugin({
            }),
            new HotModuleReplacementPlugin(),
        ],
        watch: true,
    };
};

const outputConfig = ({ rootDir }) => ({
    output: {
        path: path.resolve(rootDir, "../../../fragments"),
    },
});

module.exports = (env = {}, argv = {}) => {
    const NODE_ENV = argv.mode || process.env.NODE_ENV || "development";

    env.mode = NODE_ENV === "production" ? "production" : "development";

    const settings = {
        env: NODE_ENV,
        isDev: NODE_ENV === "development",
        rootDir: __dirname,
    };

    const modeConfig = () => ({ mode: env.mode });

    const declarationConfig = merge.smart(
        devConfig(settings),
        outputConfig(settings),
        {
            entry: path.resolve(settings.rootDir, "./js/declaration"),
            output: {
                filename: "acme-weather.js?[hash:13]",
            },
        },
        modeConfig(settings)
    );

    const fragmentConfig = merge.smart(
        devConfig(settings),
        outputConfig(settings),
        {
            entry: path.resolve(settings.rootDir, "./js/fragment"),
            output: {
                filename: "acme-weather.fragment.js?[hash:13]",
            },
        },
        modeConfig(settings)
    );

    const finalConfig = [
        declarationConfig,
        fragmentConfig,
    ];

    console.log('webpack.config', finalConfig);

    return finalConfig;
};

