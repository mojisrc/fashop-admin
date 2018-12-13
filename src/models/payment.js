import payment from "@/services/payment";

export default {
    namespace: "payment",
    state: {
        info: {}
    },
    effects: {
        * info({ payload }, { call, put }) {
            const response = yield call(payment.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        }
    },
    reducers: {
        info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        }
    }
};
