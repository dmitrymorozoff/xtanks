import getRandomInt from "../utils/index";
import config from "./config";
import GameServer from "./components/GameServer.js";
import { DEG_TO_RAD } from "../client/app/constants/index";
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
        let initAngle = -180;
        let initTowerAngle = 0;
        let tankId = guid();
        let initTank = {
            id: tankId,
            type: tank.type,
            isMe: false,
            x: initX,
            y: initY,
            z: initZ,
            health: config.TANK_INIT_HP,
            angle: initAngle * DEG_TO_RAD,
            towerAngle: initTowerAngle,
            windowInfo: {
                width: 800,
                height: 500
            }
        };
        client.emit("addTank", { ...initTank, isMe: true });
        client.broadcast.emit("addTank", initTank);
        game.addTank(initTank);
    });
    client.on("leaveGame", tankId => {
        console.log(tankId + " покинул игру");
        game.removeTank(tankId);
        client.broadcast.emit("removeTank", tankId);
    });
    client.on("movement", data => {
        if (data.id !== undefined) {
            game.setMovement(data);
        }
        client.emit("updateMovement", game.getData());
        client.broadcast.emit("updateMovement", game.getData());
    });
    client.on("updateWindowInfo", data => {
        game.updateWindowInfo(data);
    });
});
