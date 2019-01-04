import * as service from '@/services/socket';
// todo 登陆之后并且拥有order权限创建
var audio
window.onload = function() {
    setTimeout(()=>{
        audio = window.document.createElement("audio")
        audio.src = require("@/assets/mp3/order-notice.mp3");
        audio.load()
        audio.pause()
    },0)
}

export default {
    namespace: "socket",
    state: {
        list: {
            result: { list: [] ,total_number:0 }
        },
        info: {},
        setPortal: {},
        add: {},
        edit: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(page.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(page.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * setPortal({ payload, callback }, { call, put }) {
            const response = yield call(page.setPortal, payload);
            yield put({
                type: "_setPortal",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(page.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(page.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _setPortal(state, action) {
            return {
                ...state,
                setPortal: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        }
    },
    subscriptions: {
        socket({dispatch}){
            return service.listen(data => {
                switch (data.type) {
                    case 'open':
                        break;
                    case 'message':
                        if (data.state === 'notice') {
                            try {
                                if (audio) {
                                    var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
                                        && audio.readyState > 2;

                                    if (!isPlaying) {
                                        if ('play' in audio) {
                                            // Issue #331 - chrome raises exception if pause is called before media is playing
                                             const catchChromeException = (promise) => {
                                                if (promise) {
                                                    promise.catch((error) => {
                                                        console && console.info(error)
                                                    })
                                                }
                                            }
                                            // catchChromeException(audio.play());
                                        }
                                    }
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        } else {
                            dispatch({
                                type: 'connectFail'
                            })
                        }
                        break;

                }
            })
        }
    },
};
