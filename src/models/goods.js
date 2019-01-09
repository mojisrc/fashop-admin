import goods from "@/services/goods";

export default {
    namespace: "goods",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        add: {},
        edit: {},
        onSale: {},
        skuList: {
            result: { list: [], total_number: 0 }
        },
        offSale: {},
        batchDownshelf: {},
        batchUpshelf: {}
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goods.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(goods.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(goods.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(goods.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * offSale({ payload, callback }, { call, put }) {
            const response = yield call(goods.offSale, payload);
            yield put({
                type: "_offSale",
                payload: response
            });
            if (callback) callback(response);
        },
        * onSale({ payload, callback }, { call, put }) {
            const response = yield call(goods.onSale, payload);
            yield put({
                type: "_onSale",
                payload: response
            });
            if (callback) callback(response);
        },
        * skuList({ payload, callback }, { call, put }) {
            const response = yield call(goods.skuList, payload);
            console.log("response", response);
            
            yield put({
                type: "_skuList",
                payload: response
            });
            if (callback) callback(response);
        },
        * batchDownshelf({ payload, callback }, { call, put }) {
            const response = yield call(goods.batchDownshelf, payload);
            yield put({
                type: "_batchDownshelf",
                payload: response
            });
            if (callback) callback(response);
        },
        * batchUpshelf({ payload, callback }, { call, put }) {
            const response = yield call(goods.batchUpshelf, payload);
            yield put({
                type: "_batchUpshelf",
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
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        _onSale(state, action) {
            return {
                ...state,
                onSale: action.payload
            };
        },
        _skuList(state, action) {
            return {
                ...state,
                skuList: action.payload
            };
        },
        _offSale(state, action) {
            return {
                ...state,
                offSale: action.payload
            };
        },
        _batchDownshelf(state, action) {
            return {
                ...state,
                batchDownshelf: action.payload
            };
        },
        _batchUpshelf(state, action) {
            return {
                ...state,
                batchUpshelf: action.payload
            };
        }
    }
};
