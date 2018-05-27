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
            "rye": path.resolve(rootDir, "../../rye"),
            "acme-friendlist": path.resolve(rootDir, "../../pagelets/acme-friendlist"),
            "acme-friendlist.pagelet": path.resolve(rootDir, "../../pagelets/acme-friendlist.pagelet"),
            "acme-popular-products": path.resolve(rootDir, "../../pagelets/acme-popular-products"),
            "acme-popular-products.pagelet": path.resolve(rootDir, "../../pagelets/acme-popular-products.pagelet"),
            "acme-suggestions": path.resolve(rootDir, "../../pagelets/acme-suggestions"),
            "acme-suggestions.pagelet": path.resolve(rootDir, "../../pagelets/acme-suggestions.pagelet"),
            "acme-user-profile": path.resolve(rootDir, "../../pagelets/acme-user-profile"),
            "acme-user-profile.pagelet": path.resolve(rootDir, "../../pagelets/acme-user-profile.pagelet"),
            "acme-weather": path.resolve(rootDir, "../../pagelets/acme-weather"),
            "acme-weather.pagelet": path.resolve(rootDir, "../../pagelets/acme-weather.pagelet"),
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
            entry: path.resolve(settings.rootDir, "./js/main"),
            output: {
                filename: "[name].js?[hash:13]",
                path: path.resolve(settings.rootDir, "./dist"),
            },
        },
        repoConfig(settings),
        { mode: env.mode }
    );

    console.log('webpack.config', appConfig);

    return appConfig;
};

