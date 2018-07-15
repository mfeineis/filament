const path = require("path");

const express = require("express");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const pretty = it => JSON.stringify(it, null, "  ");

const baseConfig = ({ rootDir }) => ({
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(rootDir, "./index.template.html"),
        }),
    ],
    resolve: {
        alias: {
            filament: path.resolve(rootDir, "../../filament/"),
            "flmnt-getstarted": path.resolve(rootDir, "../cdn/fragments/flmnt-getstarted.js"),
            "flmnt-getstarted.fragment": path.resolve(rootDir, "../cdn/fragments/flmnt-getstarted.fragment.js"),
            "flmnt-hello": path.resolve(rootDir, "../cdn/fragments/flmnt-hello.js"),
            "flmnt-hello.fragment": path.resolve(rootDir, "../cdn/fragments/flmnt-hello.fragment.js"),
        },
    },
});

const devConfig = ({ isDev, rootDir }) => {
    if (!isDev) {
        return {};
    }

    return {
        devServer: {
            after(app) {
                app.use(
                    "/cdn/design/",
                    express.static(path.resolve(rootDir, "../cdn/design/"))
                );
                app.use(
                    "/cdn/fragments/",
                    express.static(path.resolve(rootDir, "../cdn/fragments/"))
                );
                app.use(
                    "/cdn/lib/intl-elements/",
                    express.static(path.resolve(rootDir, "../../../intl-elements/dist/"))
                );
            },
            hot: true,
            inline: true,
        },
        devtool: "cheap-module-eval-source-map",
        entry: path.resolve(rootDir, "./js/main.js"),
        mode: "development",
        output: {
            filename: "[name].js?[hash:13]",
            path: path.resolve(rootDir, "../"),
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackExternalsPlugin({
                externals: [
                    {
                        entry: {
                            path: "http://localhost:8081/cdn/design/v1/design.css",
                            type: "css",
                        },
                        module: "design",
                    },
                    {
                        entry: "http://localhost:8081/cdn/lib/intl-elements/intl-elements.js",
                        global: "IntlElements",
                        module: "intl-elements",
                    },
                ],
            }),
        ],
        watch: true,
    };
};

const prodConfig = ({ isProd, rootDir }) => {
    if (!isProd) {
        return {};
    }

    return {
        devtool: "source-map",
        mode: "production",
        entry: path.resolve(rootDir, "./js/main.js"),
        output: {
            filename: "[name].js?[chunkhash]",
            path: path.resolve(rootDir, "../"),
        },
    };
};

module.exports = (env = {}, argv = {}) => {
    const NODE_ENV = process.env.NODE_ENV;
    const settings = {
        isDev: NODE_ENV === "development",
        isProd: NODE_ENV === "production",
        rootDir: __dirname,
    };

    if (env.verbose) {
        console.log(`webpack.settings`, pretty(settings));
    }

    const appConfig = merge.smart(
        baseConfig(settings),
        devConfig(settings),
        prodConfig(settings)
    );

    if (env.verbose) {
        console.log(`webpack.config`, pretty(appConfig));
    }

    return appConfig;
};
