const clientConfig = require("./webpack/client.config");
const serverConfig = require("./webpack/server.config");

(() => {
    module.exports = [serverConfig, clientConfig];
})();
