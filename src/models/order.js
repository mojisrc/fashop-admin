import order from "@/services/order";

export default {
    namespace: "order",
    state: {
        list: {},
        info: {},
        setSend: {},
        setOrderExpires: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(order.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback();
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(order.info, payload);
            yield put({
                type: "info",
                payload: response
            });
            if (callback) callback();
        },
        * setSend({ payload, callback }, { call, put }) {
            const response = yield call(order.setSend, payload);
            yield put({
                type: "setSend",
                payload: response
            });
            if (callback) callback();
        },
        * setOrderExpires({ payload, callback }, { call, put }) {
            const response = yield call(order.setOrderExpires, payload);
            yield put({
                type: "setOrderExpires",
                payload: response
            });
            if (callback) callback();
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
        setSend(state, action) {
            return {
                ...state,
                setSend: action.payload
            };
        },
        setOrderExpires(state, action) {
            return {
                ...state,
                setOrderExpires: action.payload
            };
        }
    }
};
