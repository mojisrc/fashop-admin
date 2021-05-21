import { message } from "antd";
import defaultSettings from "../defaultSettings";
import setting from "@/services/setting";

let lessNodesAppended;
const updateTheme = primaryColor => {
    // Don't compile less in production!
    if (APP_TYPE !== "site") {
        return;
    }
    // Determine if the component is remounted
    if (!primaryColor) {
        return;
    }
    const hideMessage = message.loading("正在编译主题！", 0);

    function buildIt() {
        if (!window.less) {
            return;
        }
        setTimeout(() => {
            window.less
                .modifyVars({
                    "@primary-color": primaryColor
                })
                .then(() => {
                    hideMessage();
                })
                .catch(() => {
                    message.error("Failed to update theme");
                    hideMessage();
                });
        }, 200);
    }

    if (!lessNodesAppended) {
        // insert less.js and color.less
        const lessStyleNode = document.createElement("link");
        const lessConfigNode = document.createElement("script");
        const lessScriptNode = document.createElement("script");
        lessStyleNode.setAttribute("rel", "stylesheet/less");
        lessStyleNode.setAttribute("href", "/color.less");
        lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
        lessScriptNode.src = "https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js";
        lessScriptNode.async = true;
        lessScriptNode.onload();
        {
            buildIt();
            lessScriptNode.onload = null;
        }
        document.body.appendChild(lessStyleNode);
        document.body.appendChild(lessConfigNode);
        document.body.appendChild(lessScriptNode);
        lessNodesAppended = true;
    } else {
        buildIt();
    }
};

const updateColorWeak = colorWeak => {
    document.body.className = colorWeak ? "colorWeak" : "";
};

export default {
    namespace: "setting",
    state: Object.assign(defaultSettings, {
        info: {
            result: {
                info: {}
            },
            info: { result: { info: {} } },
            add: {},
            edit: {}
        }
    }),
    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(setting.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(setting.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(setting.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },

    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
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
        },
        getSetting(state) {
            const setting = {};
            const urlParams = new URL(window.location.href);
            Object.keys(state).forEach(key => {
                if (urlParams.searchParams.has(key)) {
                    const value = urlParams.searchParams.get(key);
                    setting[key] = value === "1" ? true : value;
                }
            });
            const { primaryColor, colorWeak } = setting;
            if (state.primaryColor !== primaryColor) {
                updateTheme(primaryColor);
            }
            updateColorWeak(colorWeak);
            return {
                ...state,
                ...setting
            };
        },
        changeSetting(state, { payload, callback }) {
            const urlParams = new URL(window.location.href);
            Object.keys(defaultSettings).forEach(key => {
                if (urlParams.searchParams.has(key)) {
                    urlParams.searchParams.delete(key);
                }
            });
            Object.keys(payload).forEach(key => {
                if (key === "collapse") {
                    return;
                }
                let value = payload[key];
                if (value === true) {
                    value = 1;
                }
                if (defaultSettings[key] !== value) {
                    urlParams.searchParams.set(key, value);
                }
            });
            const { primaryColor, colorWeak, contentWidth } = payload;
            if (state.primaryColor !== primaryColor) {
                updateTheme(primaryColor);
            }
            if (state.contentWidth !== contentWidth && window.dispatchEvent) {
                window.dispatchEvent(new Event("resize"));
            }
            updateColorWeak(colorWeak);
            window.history.replaceState(null, "setting", urlParams.href);
            return {
                ...state,
                ...payload
            };
        }
    }
};
