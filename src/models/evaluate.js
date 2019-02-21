import goods from "@/services/goods";

const evaluate = goods.evaluate;
export default {
    namespace: "goodsEvaluate",
    state: {
        list: {
            result: { list: [] ,total_number:0 }
        },
        reply: {},
        display: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(evaluate.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * reply({ payload, callback }, { call, put }) {
            const response = yield call(evaluate.reply, payload);
            yield put({
                type: "_reply",
                payload: response
            });
            if (callback) callback(response);
        },
        * display({ payload, callback }, { call, put }) {
            const response = yield call(evaluate.display, payload);
            yield put({
                type: "_display",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _reply(state, action) {
            return {
                ...state,
                reply: action.payload
            };
        },
        _display(state, action) {
            return {
                ...state,
                display: action.payload
            };
        }
    }
};
