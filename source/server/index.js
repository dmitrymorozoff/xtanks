import * as express from "express";
import * as WebSocketServer from "ws";
let app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/../client"));
app.listen(3000, function() {
    console.log("listen...");
});

let clients = {};
const webSocketServer = new WebSocketServer.Server({
    port: 8080
});

webSocketServer.on("connection", function(ws) {
    let id = Math.random();
    clients[id] = ws;
    console.log("Новое соединение " + id);
    ws.on("message", function(message) {
        console.log("Получено сообщение " + message);
        for (var key in clients) {
            clients[key].send(message);
        }
    });
    ws.on("close", function() {
        console.log("Соединение закрыто " + id);
        delete clients[id];
    });
});
