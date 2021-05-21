import payment from "@/services/payment";

export default {
    namespace: "payment",
    state: {
        info: {
            config:{}
        }
    },
    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(payment.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(payment.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        }
    }
};
