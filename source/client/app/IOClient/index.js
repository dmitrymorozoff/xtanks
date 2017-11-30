const config = {
    url: "ws://localhost:3000"
};

export default class IOClient {
    constructor() {
        this.isOpen = false;
        this.socket = io.connect(config.url);
    }
    sendMessage(data) {
        this.socket.send(data);
    }
}
