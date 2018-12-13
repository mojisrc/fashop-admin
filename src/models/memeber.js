import member from "@/services/member";

export default {
    namespace: "member",
    state: {
        list: {},
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
        * list({ payload }, { call, put }) {
            const response = yield call(member.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * token({ payload }, { call, put }) {
            const response = yield call(member.token, payload);
            yield put({
                type: "token",
                payload: response
            });
        },
        * selfEdit({ payload }, { call, put }) {
            const response = yield call(member.selfEdit, payload);
            yield put({
                type: "selfEdit",
                payload: response
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(member.add, payload);
            yield put({
                type: "add",
                payload: response
            });
        },
        * verifyCode({ payload }, { call, put }) {
            const response = yield call(member.verifyCode, payload);
            yield put({
                type: "verifyCode",
                payload: response
            });
        },
        * del({ payload }, { call, put }) {
            const response = yield call(member.del, payload);
            yield put({
                type: "del",
                payload: response
            });
        },
        * logout({ payload }, { call, put }) {
            const response = yield call(member.logout, payload);
            yield put({
                type: "logout",
                payload: response
            });
        },
        * self({ payload }, { call, put }) {
            const response = yield call(member.self, payload);
            yield put({
                type: "self",
                payload: response
            });
        },
        * selfPassword({ payload }, { call, put }) {
            const response = yield call(member.selfPassword, payload);
            yield put({
                type: "selfPassword",
                payload: response
            });
        },
        * login({ payload }, { call, put }) {
            const response = yield call(member.login, payload);
            yield put({
                type: "login",
                payload: response
            });
        }

    },
    reducers: {
        list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        token(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        selfEdit(state, action) {
            return {
                ...state,
                onSale: action.payload
            };
        },
        add(state, action) {
            return {
                ...state,
                offSale: action.payload
            };
        },
        verifyCode(state, action) {
            return {
                ...state,
                batchDownshelf: action.payload
            };
        },
        del(state, action) {
            return {
                ...state,
                batchUpshelf: action.payload
            };
        },
        logout(state, action) {
            return {
                ...state,
                logout: action.payload
            };
        },
        self(state, action) {
            return {
                ...state,
                self: action.payload
            };
        },
        selfPassword(state, action) {
            return {
                ...state,
                selfPassword: action.payload
            };
        },
        login(state, action) {
            return {
                ...state,
                login: action.payload
            };
        }
    }
};
