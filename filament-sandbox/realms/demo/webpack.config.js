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
            "filament": path.resolve(rootDir, "../../../filament/"),
            "acme-friendlist": path.resolve(rootDir, "../../fragments/acme-friendlist"),
            "acme-friendlist.fragment": path.resolve(rootDir, "../../fragments/acme-friendlist.fragment"),
            "acme-popular-products": path.resolve(rootDir, "../../fragments/acme-popular-products"),
            "acme-popular-products.fragment": path.resolve(rootDir, "../../fragments/acme-popular-products.fragment"),
            "acme-suggestions": path.resolve(rootDir, "../../fragments/acme-suggestions"),
            "acme-suggestions.fragment": path.resolve(rootDir, "../../fragments/acme-suggestions.fragment"),
            "acme-user-profile": path.resolve(rootDir, "../../fragments/acme-user-profile"),
            "acme-user-profile.fragment": path.resolve(rootDir, "../../fragments/acme-user-profile.fragment"),
            "acme-weather": path.resolve(rootDir, "../../fragments/acme-weather"),
            "acme-weather.fragment": path.resolve(rootDir, "../../fragments/acme-weather.fragment"),
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
                const serveFragments = express.static(
                    path.resolve(rootDir, "../../fragments/")
                );
                app.use("/fragments/", serveFragments);
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

