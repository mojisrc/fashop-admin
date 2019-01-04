export default class WebSocketUtils {
    constructor({ host }) {
        this.host = host;
    }

    host = "ws://127.0.0.1:9510";
    connectStatus = false;
    socket;

    init() {
        if (window.WebSocket) {
            this.socket = new WebSocket(this.host);
        } else {
            alert("您的浏览器不支持WebSocket.");
        }
    }

    keepHeartbeat() {
        setInterval(() => {
            if (this.connectStatus !== true) {
                this.init();
                console.log("正在尝试重链...");
            }
            this.socket.send("pong");
        }, 3000);
    }
}
