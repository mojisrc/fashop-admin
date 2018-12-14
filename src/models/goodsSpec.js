import goods from "@/services/goods";

const spec = goods.spec;
export default {
    namespace: "spec",
    state: {
        list: {},
        add: {},
        edit: {},
        del: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(spec.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(spec.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(spec.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(spec.del, payload);
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
