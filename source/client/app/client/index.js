const config = {
    url: "ws://localhost:8080"
};

export default class Client {
    constructor() {
        this.isOpen = false;
        this.socket = new WebSocket(config.url);
        this.socket.onmessage = function(event) {
            console.log(event);
        };
        this.socket.onopen = () => {
            isOpen = true;
        };
    }
    sendMessage() {
        if(this.isOpen) {
            this.socket.send("hello");
        }
    }
}
