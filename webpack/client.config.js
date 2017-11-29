const webpack = require("webpack");
const path = require("path");

console.log(path.resolve(__dirname, "../dist/js"), "tesy");

let config = {
    entry: ["./source/client/app.js"],
    output: {
        path: path.resolve(__dirname, "../dist/js"),
        publicPath: "",
        filename: "js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["env"]]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()],
    devServer: {
        port: 8080,
        host: "localhost",
        hot: true,
        open: true,
        inline: true,
        openPage: "",
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "../dist"),
    },
    // watch: true,
    devtool: "source-map"
};

module.exports = config;