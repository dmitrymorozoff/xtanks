var socket = require("socket.io");
var express = require("express");
import getRandomInt from "../utils/index";
const config = {
    port: 3000
};
var app = express();
let server = app.listen(config.port);
app.use(express.static("dist/client"));
console.log(`Server running on port ${config.port}`);

let io = socket(server);
let players = {};

io.sockets.on("connection", function(socket) {
    let id = socket.id.toString().substr(0, 5);
    players[id] = {};
    players[id].x = getRandomInt(0, 10);
    players[id].y = 1;
    players[id].z = getRandomInt(0, 10);
    socket.json.send({ event: "connected", players, myId: id });
    socket.broadcast.json.send({ event: "playerJoined", players, myId: id });
    socket.on("message", function(msg) {
        console.log(msg);
        socket.json.send({
            event: "messageFromServer",
            name: id,
            text: msg
        });
    });
    // При отключении клиента - уведомляем остальных
    socket.on("disconnect", function() {
        io.sockets.json.send({ event: "playerSplit", name: id });
        delete players[id];
    });
});
