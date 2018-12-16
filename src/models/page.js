import page from "@/services/page";

export default {
    namespace: "page",
    state: {
        list: {},
        info: {},
        setPagePortal: {},
        add: {},
        edit: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(page.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(page.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * setPagePortal({ payload, callback }, { call, put }) {
            const response = yield call(page.setPagePortal, payload);
            yield put({
                type: "_setPagePortal",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(page.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(page.edit, payload);
            yield put({
                type: "_edit",
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
        _setPagePortal(state, action) {
            return {
                ...state,
                setPagePortal: action.payload
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
        }
    }
};
