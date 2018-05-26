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
        path: path.resolve(rootDir, "../../../pagelets"),
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

    const registrationConfig = merge.smart(
        devConfig(settings),
        outputConfig(settings),
        {
            entry: path.resolve(settings.rootDir, "./js/registration"),
            output: {
                filename: "rye-user-profile.js?[hash:13]",
            },
            resolve: {
                alias: {
                    "rye-pagelet-registry": path.resolve(
                        settings.rootDir,
                        "../../../rye-pagelet-registry"
                    ),
                },
            },
        },
        modeConfig(settings)
    );

    const pageletConfig = merge.smart(
        devConfig(settings),
        outputConfig(settings),
        {
            entry: path.resolve(settings.rootDir, "./js/pagelet"),
            output: {
                filename: "rye-user-profile.pagelet.js?[hash:13]",
            },
            resolve: {
                alias: {
                    "rye-pagelet": path.resolve(
                        settings.rootDir,
                        "../../../rye-pagelet"
                    ),
                },
            },
        },
        modeConfig(settings)
    );

    const finalConfig = [
        pageletConfig,
        registrationConfig,
    ];

    console.log('webpack.config', finalConfig);

    return finalConfig;
};

