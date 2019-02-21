import order from "@/services/order";

const refund = order.refund;
export default {
    namespace: "refund",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: {},
        handle: {},
        refund: {},
        receive: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(refund.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(refund.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * handle({ payload, callback }, { call, put }) {
            const response = yield call(refund.handle, payload);
            yield put({
                type: "_handle",
                payload: response
            });
            if (callback) callback(response);
        },
        * refund({ payload, callback }, { call, put }) {
            const response = yield call(refund.refund, payload);
            yield put({
                type: "_refund",
                payload: response
            });
            if (callback) callback(response);
        },
        * receive({ payload, callback }, { call, put }) {
            const response = yield call(refund.receive, payload);
            yield put({
                type: "_receive",
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
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _handle(state, action) {
            return {
                ...state,
                handle: action.payload
            };
        },
        _refund(state, action) {
            return {
                ...state,
                refund: action.payload
            };
        },
        _receive(state, action) {
            return {
                ...state,
                receive: action.payload
            };
        }
    }
};
