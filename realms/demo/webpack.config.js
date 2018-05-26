const path = require("path");

const express = require("express");

const { HotModuleReplacementPlugin } = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const repoConfig = ({ rootDir }) => ({
    //plugins: [
    //    new HtmlWebpackExternalsPlugin({
    //        externals: [
    //            {
    //                entry: path.resolve({}),
    //                module: "",
    //            },
    //        ],
    //    }),
    //],
    resolve: {
        alias: {
            "rye-core": path.resolve(rootDir, "../../rye-core"),
            "rye-suggestions": path.resolve(rootDir, "../../pagelets/rye-suggestions"),
            "rye-suggestions.pagelet": path.resolve(rootDir, "../../pagelets/rye-suggestions.pagelet"),
            "rye-user-profile": path.resolve(rootDir, "../../pagelets/rye-user-profile"),
            "rye-user-profile.pagelet": path.resolve(rootDir, "../../pagelets/rye-user-profile.pagelet"),
        },
    },
});

const devConfig = ({ isDev, rootDir }) => {
    if (!isDev) {
        return {};
    }

    return {
        devServer: {
            before: (app) => {
                const servePagelets = express.static(
                    path.resolve(rootDir, "../../pagelets/")
                );
                app.use("/pagelets/", servePagelets);
            },
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
            devtool: "sourcemap",
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
        repoConfig(settings),
        { mode: env.mode }
    );

    //const suggestionsConfig = merge.smart(
    //    widgetConfig(settings),
    //    devConfig(settings),
    //    {
    //        entry: path.resolve(settings.rootDir, "./src/suggestions.widget"),
    //        output: {
    //            filename: "rye-suggestions.js?[hash:13]",
    //            path: path.resolve(settings.rootDir, "./dist"),
    //        },
    //    },
    //    { mode: env.mode }
    //);

    const result = [
        appConfig,
        //suggestionsConfig,
    ];

    console.log('webpack.config', result);

    return result;
};

