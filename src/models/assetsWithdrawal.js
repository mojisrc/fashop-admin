import assetswithdrawal from "@/services/assetsWithdrawal";

export default {
    namespace: "assetsWithdrawal",
    state: {
        list: {
            result: { list: [] ,total_number:0 }
        },
        info: {},
        add: {},
        edit: {},
        del: {},
        examine: {},
        payment: {},
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * examine({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.examine, payload);
            yield put({
                type: "_examine",
                payload: response
            });
            if (callback) callback(response);
        },
        * payment({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.payment, payload);
            yield put({
                type: "_payment",
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
        _examine(state, action) {
            return {
                ...state,
                examine: action.payload
            };
        },
        _payment(state, action) {
            return {
                ...state,
                payment: action.payload
            };
        },
    }
};
