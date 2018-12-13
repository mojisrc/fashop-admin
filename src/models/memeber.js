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
        * list({ payload, callback }, { call, put }) {
            const response = yield call(member.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback();
        },
        * token({ payload, callback }, { call, put }) {
            const response = yield call(member.token, payload);
            yield put({
                type: "token",
                payload: response
            });
            if (callback) callback();
        },
        * selfEdit({ payload, callback }, { call, put }) {
            const response = yield call(member.selfEdit, payload);
            yield put({
                type: "selfEdit",
                payload: response
            });
            if (callback) callback();
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(member.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback();
        },
        * verifyCode({ payload, callback }, { call, put }) {
            const response = yield call(member.verifyCode, payload);
            yield put({
                type: "verifyCode",
                payload: response
            });
            if (callback) callback();
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(member.del, payload);
            yield put({
                type: "del",
                payload: response
            });
            if (callback) callback();
        },
        * logout({ payload, callback }, { call, put }) {
            const response = yield call(member.logout, payload);
            yield put({
                type: "logout",
                payload: response
            });
            if (callback) callback();
        },
        * self({ payload, callback }, { call, put }) {
            const response = yield call(member.self, payload);
            yield put({
                type: "self",
                payload: response
            });
            if (callback) callback();
        },
        * selfPassword({ payload, callback }, { call, put }) {
            const response = yield call(member.selfPassword, payload);
            yield put({
                type: "selfPassword",
                payload: response
            });
            if (callback) callback();
        },
        * login({ payload, callback }, { call, put }) {
            const response = yield call(member.login, payload);
            yield put({
                type: "login",
                payload: response
            });
            if (callback) callback();
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
