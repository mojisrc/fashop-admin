import goods from "@/services/goods";

const category = goods.category;
export default {
    namespace: "category",
    state: {
        list: {},
        info: {},
        add: {},
        edit: {},
        del: {},
        sort: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(category.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(category.info, payload);
            yield put({
                type: "info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(category.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(category.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(category.del, payload);
            yield put({
                type: "del",
                payload: response
            });
            if (callback) callback(response);
        },
        * sort({ payload, callback }, { call, put }) {
            const response = yield call(category.sort, payload);
            yield put({
                type: "sort",
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
        add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        sort(state, action) {
            return {
                ...state,
                sort: action.payload
            };
        }
    }
};
