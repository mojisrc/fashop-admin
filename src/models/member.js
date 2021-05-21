import member from "@/services/member";
import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/authorized";
import { stringify } from "qs";
import { getPageQuery } from "@/utils";
export default {
    namespace: "member",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        token: {},
        selfEdit: {},
        add: {},
        verifyCode: {},
        del: {},
        logout: {},
        self: {},
        selfPassword: {},
        login: {}
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(member.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(member.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * token({ payload, callback }, { call, put }) {
            const response = yield call(member.token, payload);
            yield put({
                type: "_token",
                payload: response
            });
            if (callback) callback(response);
        },
        * selfEdit({ payload, callback }, { call, put }) {
            const response = yield call(member.selfEdit, payload);
            yield put({
                type: "_selfEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(member.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(member.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * verifyCode({ payload, callback }, { call, put }) {
            const response = yield call(member.verifyCode, payload);
            yield put({
                type: "_verifyCode",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(member.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * self({ payload, callback }, { call, put }) {
            const response = yield call(member.self, payload);
            yield put({
                type: "_self",
                payload: response
            });
            if (callback) callback(response);
        },
        * selfPassword({ payload, callback }, { call, put }) {
            const response = yield call(member.selfPassword, payload);
            yield put({
                type: "_selfPassword",
                payload: response
            });
            if (callback) callback(response);
        },
        * login({ payload, callback }, { call, put }) {
            const response = yield call(member.login, payload);
            yield put({
                type: "_login",
                payload: response
            });
            if (callback) callback(response);
            if (response.code === 0) {
                setAuthority(["admin"]);
                localStorage.setItem("token", JSON.stringify({
                    accessToken: response.result.access_token,
                    expiresIn: response.result.expires_in,
                    createTime: Date.parse(new Date()).toString().substr(0, 10)
                }));
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                let params = getPageQuery();
                let { redirect } = params;
                if (redirect && redirect.indexOf("login") === -1) {
                    const redirectUrlParams = new URL(redirect);
                    // 临时注释 解决hash bug
                    // if (redirectUrlParams.origin === urlParams.origin) {
                    //     redirect = redirect.substr(urlParams.origin.length);
                    //     if (redirect.match(/^\/.*#/)) {
                    //         redirect = redirect.substr(redirect.indexOf("#") + 1);
                    //     }
                    // }
                    // 为了清空所有redux
                    window.location.href = redirect;
                } else {
                    // 为了清空所有redux
                    window.location.href = process.env.base;
                }
            }
        },
        * logout() {
            reloadAuthorized();
            localStorage.setItem("token", null);
            // todo 如果定义了路由前缀判断
            window.location.href = process.env.base + "login?" + stringify({
                redirect: window.location.href
            });
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
        _token(state, action) {
            return {
                ...state,
                token: action.payload
            };
        },
        _selfEdit(state, action) {
            return {
                ...state,
                selfEdit: action.payload
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
        _verifyCode(state, action) {
            return {
                ...state,
                verifyCode: action.payload
            };
        },
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _self(state, action) {
            return {
                ...state,
                self: action.payload
            };
        },
        _selfPassword(state, action) {
            return {
                ...state,
                selfPassword: action.payload
            };
        },
        _login(state, action) {
            return {
                ...state,
                login: action.payload
            };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            const token = JSON.parse(localStorage.getItem("token"));
            // if (history.location.pathname.indexOf("login") > -1 && token !== null) {
            //     dispatch({
            //         type: "member/logout"
            //     });
            // }
        }
    }
};
