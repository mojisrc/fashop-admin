import * as service from "@/services/socket";
// 全局铃声
var audio;

export default {
    namespace: "socket",
    state: {},
    effects: {},
    reducers: {},
    subscriptions: {
        socket({ dispatch }) {
            // 验证登陆
            const token = JSON.parse(localStorage.getItem("token"));
            if (token) {
                // 注册全局铃声
                window.onload = function() {
                    setTimeout(() => {
                        audio = window.document.createElement("audio");
                        audio.style = 'display:none'
                        window.document.body.appendChild(audio);
                        audio.src = require("@/assets/mp3/order-notice.mp3");
                        audio.load();
                        audio.pause();
                    }, 500);
                };
                return service.listen(data => {
                    switch (data.action) {
                        case "admin.order.pay":
                            try {
                                if (audio) {
                                    console.log(audio)
                                    var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
                                        && audio.readyState > 2;

                                    if (!isPlaying) {
                                        if ("play" in audio) {
                                            // Issue #331 - chrome raises exception if pause is called before media is playing
                                            const catchChromeException = (promise) => {
                                                if (promise) {
                                                    promise.catch((error) => {
                                                        console && console.info(error);
                                                    });
                                                }
                                            };
                                            catchChromeException(audio.play());
                                            audio.play()
                                        }
                                    }
                                }
                            } catch (e) {
                                console.log(e);
                            }
                            break;

                    }
                });
            }

        }
    }
};
