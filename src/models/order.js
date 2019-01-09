import order from "@/services/order";

export default {
    namespace: "order",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: {},
        setSend: {},
        setOrderExpires: {},
        changePrice: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(order.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(order.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * setSend({ payload, callback }, { call, put }) {
            const response = yield call(order.setSend, payload);
            yield put({
                type: "_setSend",
                payload: response
            });
            if (callback) callback(response);
        },
        * setOrderExpires({ payload, callback }, { call, put }) {
            const response = yield call(order.setOrderExpires, payload);
            yield put({
                type: "_setOrderExpires",
                payload: response
            });
            if (callback) callback(response);
        },
        * changePrice({ payload, callback }, { call, put }) {
            const response = yield call(order.changePrice, payload);
            yield put({
                type: "_changePrice",
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
        _setSend(state, action) {
            return {
                ...state,
                setSend: action.payload
            };
        },
        _setOrderExpires(state, action) {
            return {
                ...state,
                setOrderExpires: action.payload
            };
        },
        _changePrice(state, action) {
            return {
                ...state,
                changePrice: action.payload
            };
        }
    }
};
