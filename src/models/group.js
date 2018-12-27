import group from "@/services/group";

export default {
    namespace: "group",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        add: {},
        edit: {},
        del: {},
        showSet: {},
        selectableGoods: {
            result: { list: [], total_number: 0 }
        },
        selectedGoods: {
            result: { list: [], total_number: 0 }
        },
        goodsSkuList: {
            result: { list: [], total_number: 0 }
        },
        pageGoods: {
            result: { list: [], total_number: 0 }
        },
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(group.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(group.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(group.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(group.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(group.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * showSet({ payload, callback }, { call, put }) {
            const response = yield call(group.showSet, payload);
            yield put({
                type: "_showSet",
                payload: response
            });
            if (callback) callback(response);
        },
        * selectableGoods({ payload, callback }, { call, put }) {
            const response = yield call(group.selectableGoods, payload);
            yield put({
                type: "_selectableGoods",
                payload: response
            });
            if (callback) callback(response);
        },
        * selectedGoods({ payload, callback }, { call, put }) {
            const response = yield call(group.selectedGoods, payload);
            yield put({
                type: "_selectedGoods",
                payload: response
            });
            if (callback) callback(response);
        },
        * goodsSkuList({ payload, callback }, { call, put }) {
            const response = yield call(group.goodsSkuList, payload);
            yield put({
                type: "_goodsSkuList",
                payload: response
            });
            if (callback) callback(response);
        },
        * pageGoods({ payload, callback }, { call, put }) {
            const response = yield call(group.pageGoods, payload);
            yield put({
                type: "_pageGoods",
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
        _showSet(state, action) {
            return {
                ...state,
                showSet: action.payload
            };
        },
        _selectableGoods(state, action) {
            return {
                ...state,
                selectableGoods: action.payload
            };
        },
        _selectedGoods(state, action) {
            return {
                ...state,
                selectedGoods: action.payload
            };
        },
        _goodsSkuList(state, action) {
            return {
                ...state,
                goodsSkuList: action.payload
            };
        },
        _pageGoods(state, action) {
            return {
                ...state,
                pageGoods: action.payload
            };
        },
    }
};
