let ws;

export function listen(callback) {
    return false;
    let connectStatus = false;
    let host = process.env.NODE_ENV === "production" ? process.env.production.websocket.host : process.env.dev.websocket.host;
    let init = function() {
        if (window.WebSocket) {
            ws = new WebSocket(host);
        } else {
            alert("您的浏览器不支持WebSocket.");
        }
    };
    let keepHeartbeat = function() {
        setInterval(() => {
            if (connectStatus !== true) {
                init();
                console.log("正在尝试重链...");
            } else {
                ws.send("pong");
            }
        }, 3000);
    };
    if (!ws) {
        try {
            init();
            keepHeartbeat();
            ws.onopen = function() {
                connectStatus = true;
                const token = JSON.parse(localStorage.getItem("token"));
                ws.send(JSON.stringify({
                    sign: "login",
                    action: "admin.member.login",
                    param: {
                        access_token: token.accessToken
                    }
                }));
            };
            ws.onclose = function() {
                connectStatus = false;
            };
            ws.onmessage = function(event) {
                const token = JSON.parse(localStorage.getItem("token"));
                if (token) {
                    if (typeof event.data === "string") {
                        try {
                            var data = JSON.parse(event.data);
                            if (typeof data === "object" && data) {
                                if (typeof data["action"] !== "undefined") {
                                    callback(data);
                                }
                            } else {
                                return false;
                            }
                        } catch (e) {
                            return false;
                        }
                    }

                }
            };
            ws.onerror = function(event) {
                console.log(event);
            };
        } catch (err) {
            console.log("ws err", err);
        }
    }
}
