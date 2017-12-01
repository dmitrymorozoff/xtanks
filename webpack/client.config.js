const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

let config = {
    entry: ["./source/client/app.js"],
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        publicPath: "",
        filename: "bundle.js",
        crossOriginLoading: "anonymous"
    },
    module: {
        rules: [
            {
                test: [/\.js?$/],
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css", ".scss", ".sass", ".less"],
        modules: [path.resolve("./source/client"), "node_modules"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./source/client/index-template.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeOptionalTags: true
            },
            hash: true
        }),
        new CopyWebpackPlugin([{
            from: "source/client/assets",
            to: "assets",
        }], {})
    ],
    devServer: {
        port: 3000,
        host: "localhost",
        hot: true,
        open: true,
        inline: true,
        openPage: "",
        historyApiFallback: true
    }
};

module.exports = config;
