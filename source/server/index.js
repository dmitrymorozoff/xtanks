import getRandomInt from "../utils/index";
import config from "./config";
let socket = require("socket.io");
let express = require("express");
let path = require('path');
let http = require("http");

let app = express();
let server = http.Server(app);
let io = socket(server);
app.set("port", config.port);
app.use(express.static("dist/client"));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "client/index.html"));
});

server.listen(config.port, () => {
    console.log(`Сервер запущен на порте ${config.port}`);
});

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
    socket.on("disconnect", function() {
        io.sockets.json.send({ event: "playerSplit", name: id });
        delete players[id];
    });
});
