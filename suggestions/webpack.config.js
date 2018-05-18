const path = require("path");

const { HotModuleReplacementPlugin } = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devConfig = ({ isDev }) => {
    if (!isDev) {
        return {};
    }

    return {
        devServer: {
            historyApiFallback: true,
            host: "0.0.0.0",
            hot: true,
            inline: true,
        },
        plugins: [
            new HotModuleReplacementPlugin(),
        ],
        watch: true,
    };
};

const widgetConfig = () => ({
    module: {
        rules: [
            {
                loader: './widget-loader',
                //options: { someOption: true },
                //test: /\.widget\.jsx?$/,
            },
        ],
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

    const appConfig = merge.smart(
        {
            plugins: [
                new CleanWebpackPlugin(["dist"]),
                new HtmlWebpackPlugin({
                }),
            ],
        },
        devConfig(settings),
        {
            entry: path.resolve(settings.rootDir, "./src/main"),
            output: {
                filename: "[name].js?[hash:13]",
                path: path.resolve(settings.rootDir, "./dist"),
            },
        },
        { mode: env.mode }
    );

    const suggestionsConfig = merge.smart(
        widgetConfig(settings),
        devConfig(settings),
        {
            entry: path.resolve(settings.rootDir, "./src/suggestions.widget"),
            output: {
                filename: "rye-suggestions.js?[hash:13]",
                path: path.resolve(settings.rootDir, "./dist"),
            },
        },
        { mode: env.mode },

    );

    const result = [
        appConfig,
        suggestionsConfig,
    ];

    console.log('webpack.config', result);

    return result;
};

