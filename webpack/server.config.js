const path = require("path");

console.log(path.resolve(__dirname, "../dist"), "test!!!!!!");

let config = {
    target: "node",
    // node: {
    //     __dirname: false,
    // },
    entry: ["./source/server/index.js"],
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "../dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".sass", ".less"],
        modules: [path.resolve("./source/client"), "node_modules"]
    },
    externals: [
        /^(?!\.|\/|\$|services|data|views|components|normalize\.css|styles).+/i
    ]
};

module.exports = config;
