import goodsRelation from "@/services/goodsRelation";

export default {
    namespace: "goodsRelation",
    state: {
        list: {
            result: { list: [] ,total_number:0 }
        },
        info: {},
        add: {},
        edit: {},
        del: {},
        goodsList: {
            result: { list: [] ,total_number:0 }
        },
        pageGoodsRelationList: {
            result: { list: [] ,total_number:0 }
        },
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * pageGoodsRelationList({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.pageGoodsRelationList, payload);
            yield put({
                type: "_pageGoodsRelationList",
                payload: response
            });
            if (callback) callback(response);
        },
        * goodsList({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.goodsList, payload);
            yield put({
                type: "_goodsList",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(goodsRelation.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
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
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _goodsList(state, action) {
            return {
                ...state,
                goodsList: action.payload
            };
        },
        _pageGoodsRelationList(state, action) {
            return {
                ...state,
                pageGoodsRelationList: action.payload
            };
        },

    }
};
