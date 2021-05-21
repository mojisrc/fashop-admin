import coupon from "@/services/coupon";

export default {
    namespace: "coupon",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        pageCoupons: {
            result: { list: [], total_number: 0 }
        },
        info: {
            result: { info: {} }
        },
        add: {
            result: {}
        },
        edit: {
            result: {}
        },
        cancel: {},
        goodsList: {
            result: { list: [], total_number: 0 }
        },
        users: {
            result: { list: [], total_number: 0 }
        },
        del: {
            result: {}
        },
        selectableUsers: {
            result: { list: [], total_number: 0 }
        },
        give: {
            result: {}
        }

    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(coupon.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(coupon.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(coupon.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(coupon.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * cancel({ payload, callback }, { call, put }) {
            const response = yield call(coupon.cancel, payload);
            yield put({
                type: "_cancel",
                payload: response
            });
            if (callback) callback(response);
        },
        * goodsList({ payload, callback }, { call, put }) {
            const response = yield call(coupon.goodsList, payload);
            yield put({
                type: "_goodsList",
                payload: response
            });
            if (callback) callback(response);
        },
        * users({ payload, callback }, { call, put }) {
            const response = yield call(coupon.users, payload);
            yield put({
                type: "_users",
                payload: response
            });
            if (callback) callback(response);
        },
        * pageCoupons({ payload, callback }, { call, put }) {
            const response = yield call(coupon.pageCoupons, payload);
            yield put({
                type: "_pageCoupons",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(coupon.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * selectableUsers({ payload, callback }, { call, put }) {
            const response = yield call(coupon.selectableUsers, payload);
            yield put({
                type: "_selectableUsers",
                payload: response
            });
            if (callback) callback(response);
        },
        * give({ payload, callback }, { call, put }) {
            const response = yield call(coupon.give, payload);
            yield put({
                type: "_give",
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
        _pageCoupons(state, action) {
            return {
                ...state,
                pageCoupons: action.payload
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
        _cancel(state, action) {
            return {
                ...state,
                cancel: action.payload
            };
        },
        _goodsList(state, action) {
            return {
                ...state,
                goodsList: action.payload
            };
        },
        _users(state, action) {
            return {
                ...state,
                users: action.payload
            };
        },
        _pageCoupins(state, action) {
            return {
                ...state,
                pageCoupins: action.payload
            };
        },
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _selectableUsers(state, action) {
            return {
                ...state,
                selectableUsers: action.payload
            };
        },
        _give(state, action) {
            return {
                ...state,
                give: action.payload
            };
        }
    }
};
