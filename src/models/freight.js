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
        * list({ payload }, { call, put }) {
            const response = yield call(freight.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * info({ payload }, { call, put }) {
            const response = yield call(freight.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(freight.add, payload);
            yield put({
                type: "add",
                payload: response
            });
        },
        * edit({ payload }, { call, put }) {
            const response = yield call(freight.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
        },
        * del({ payload }, { call, put }) {
            const response = yield call(freight.del, payload);
            yield put({
                type: "del",
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
