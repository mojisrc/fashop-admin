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
        * list({ payload }, { call, put }) {
            const response = yield call(order.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * info({ payload }, { call, put }) {
            const response = yield call(order.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        },
        * setSend({ payload }, { call, put }) {
            const response = yield call(order.setSend, payload);
            yield put({
                type: "setSend",
                payload: response
            });
        },
        * setOrderExpires({ payload }, { call, put }) {
            const response = yield call(order.setOrderExpires, payload);
            yield put({
                type: "setOrderExpires",
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
