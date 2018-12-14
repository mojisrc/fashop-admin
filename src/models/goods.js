import goods from "@/services/goods";

export default {
    namespace: "goods",
    state: {
        list: {},
        info: {},
        onSale: {},
        offSale: {},
        batchDownshelf: {},
        batchUpshelf: {}
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goods.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(goods.info, payload);
            yield put({
                type: "info",
                payload: response
            });
            if (callback) callback(response);
        },
        * offSale({ payload, callback }, { call, put }) {
            const response = yield call(goods.offSale, payload);
            yield put({
                type: "offSale",
                payload: response
            });
            if (callback) callback(response);
        },
        * onSale({ payload, callback }, { call, put }) {
            const response = yield call(goods.onSale, payload);
            yield put({
                type: "onSale",
                payload: response
            });
            if (callback) callback(response);
        },
        * batchDownshelf({ payload, callback }, { call, put }) {
            const response = yield call(goods.batchDownshelf, payload);
            yield put({
                type: "batchDownshelf",
                payload: response
            });
            if (callback) callback(response);
        },
        * batchUpshelf({ payload, callback }, { call, put }) {
            const response = yield call(goods.batchUpshelf, payload);
            yield put({
                type: "batchUpshelf",
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
        info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        onSale(state, action) {
            return {
                ...state,
                onSale: action.payload
            };
        },
        offSale(state, action) {
            return {
                ...state,
                offSale: action.payload
            };
        },
        batchDownshelf(state, action) {
            return {
                ...state,
                batchDownshelf: action.payload
            };
        },
        batchUpshelf(state, action) {
            return {
                ...state,
                batchUpshelf: action.payload
            };
        }
    }
};
