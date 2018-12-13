import goods from "@/services/goods";

const specValue = goods.specValue;
export default {
    namespace: "specValue",
    state: {
        list: {},
        add: {},
        del: {}
    },
    effects: {
        * list({ payload }, { call, put }) {
            const response = yield call(specValue.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(specValue.add, payload);
            yield put({
                type: "add",
                payload: response
            });
        },
        * del({ payload }, { call, put }) {
            const response = yield call(specValue.del, payload);
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
        add(state, action) {
            return {
                ...state,
                add: action.payload
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
