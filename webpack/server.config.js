const path = require("path");

let config = {
    target: "node",
    entry: ["./source/server/index.js"],
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "../dist"),
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
        devtoolFallbackModuleFilenameTemplate:
            "[absolute-resource-path]?[hash]",
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [".js"],
        modules: [path.resolve("./source/client"), "node_modules"]
    },
    externals: [
        /^(?!\.|\/|\$|services|data|views|components|normalize\.css|styles).+/i
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: ["babel-loader"],
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;
