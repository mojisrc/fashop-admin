
let websocket = "";

export function listen(action) {
    if (websocket === "") {
        try {
            websocket = new WebSocket({
                host: "ws://127.0.0.1:9510"
            });
            websocket.init();
            // websocket.keepHeartbeat()
            websocket.socket.onopen = function(event) {
                console.log(event.type);
                websocket.socket.isConnection = true;
            };
            websocket.socket.onclose = function(event) {
                console.log(event.type);
            };
            websocket.socket.onmessage = function(event) {
                var data = JSON.parse(event.data);
                if (data.type !== "pong") {
                    action({
                        type: "message",
                        state: "notice"
                    });
                }
                if (data.type === "pong") {
                    console.log("保持心跳");
                }
            };
            // websocket.socket.onerror = function(event) {
            //     console.log(event);
            // };

        } catch (err) {
            console.log("websocket err", err);
        }
    }
}
