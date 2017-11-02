const webpack = require("webpack");
const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    entry: "./source/app.js",
    output: {
        path: path.resolve(__dirname, "dist/js"),
        publicPath: "/js/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new BrowserSyncPlugin(
            {
                host: "localhost",
                port: 3001,
                proxy: "http://localhost:8080/",
                files: [
                    {
                        match: ["**/*.html"],
                        fn: event => {
                            if (event === "change") {
                                const browserSync = require("browser-sync").get(
                                    "bs-webpack-plugin"
                                );
                                browserSync.reload();
                            }
                        }
                    }
                ]
            },
            {
                reload: false
            }
        )
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/js/"
    },
    watch: true,
    devtool: "cheap-eval-source-map"
};
