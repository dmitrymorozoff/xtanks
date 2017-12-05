import getRandomInt from "../utils/index";
import config from "./config";
import GameServer from "./components/GameServer.js";
let socket = require("socket.io");
let express = require("express");
let path = require("path");
let http = require("http");

export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
}

let app = express();
let server = http.Server(app);
let io = socket(server);
app.set("port", config.port);
app.use(express.static("dist/client"));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "dist/client/index.html"));
});

server.listen(config.port, () => {
    console.log(`Сервер запущен на порте ${config.port}`);
});

const game = new GameServer();

io.sockets.on("connection", function(client) {
    console.log("Игрок подключился");
    client.on("joinGame", tank => {
        console.log(tank.name + " зашел в игру");
        let initX = getRandomInt(1, 10);
        let initY = 1;
        let initZ = getRandomInt(1, 11);
        let tankId = guid();
        client.emit("addTank", {
            id: tankId,
            type: tank.type,
            isMe: true,
            x: initX,
            y: initY,
            z: initZ,
            health: config.TANK_INIT_HP
        });
        client.broadcast.emit("addTank", {
            id: tankId,
            type: tank.type,
            isMe: false,
            x: initX,
            y: initY,
            z: initZ,
            health: config.TANK_INIT_HP
        });
        game.addTank({
            id: tankId,
            type: tank.type,
            health: config.TANK_INIT_HP
        });
    });
    client.on("leaveGame", tankId => {
        console.log(tankId + " покинул игру");
        game.removeTank(tankId);
        client.broadcast.emit("removeTank", tankId);
    });
    client.on("updateGame", data => {
        if (data.tank !== undefined) {
            game.updateTanksPosition(data.tank);
        }
        client.emit("updateGame", game.getData());
        client.broadcast.emit("updateGame", game.getData());
    });
});
