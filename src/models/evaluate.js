import goods from "@/services/goods";

const evaluate = goods.evaluate;
export default {
    namespace: "evaluate",
    state: {
        list: {},
        reply: {},
        display: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(evaluate.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * reply({ payload, callback }, { call, put }) {
            const response = yield call(evaluate.reply, payload);
            yield put({
                type: "reply",
                payload: response
            });
            if (callback) callback(response);
        },
        * display({ payload, callback }, { call, put }) {
            const response = yield call(evaluate.display, payload);
            yield put({
                type: "display",
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
        reply(state, action) {
            return {
                ...state,
                reply: action.payload
            };
        },
        display(state, action) {
            return {
                ...state,
                display: action.payload
            };
        }
    }
};
