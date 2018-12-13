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
        * list({ payload }, { call, put }) {
            const response = yield call(evaluate.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * reply({ payload }, { call, put }) {
            const response = yield call(evaluate.reply, payload);
            yield put({
                type: "reply",
                payload: response
            });
        },
        * display({ payload }, { call, put }) {
            const response = yield call(evaluate.display, payload);
            yield put({
                type: "display",
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
