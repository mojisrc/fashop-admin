import freight from "@/services/freight";

export default {
    namespace: "freight",
    state: {
        list: {},
        info: {},
        add: {},
        edit: {},
        del: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(freight.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(freight.info, payload);
            yield put({
                type: "info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(freight.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(freight.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(freight.del, payload);
            yield put({
                type: "del",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        }
    }
};
