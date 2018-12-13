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
                type: "list",
                payload: response
            });
            if (callback) callback();
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(page.info, payload);
            yield put({
                type: "info",
                payload: response
            });
            if (callback) callback();
        },
        * setPagePortal({ payload, callback }, { call, put }) {
            const response = yield call(page.setPagePortal, payload);
            yield put({
                type: "setPagePortal",
                payload: response
            });
            if (callback) callback();
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(page.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback();
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(page.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
            if (callback) callback();
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
        setPagePortal(state, action) {
            return {
                ...state,
                setPagePortal: action.payload
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
        }
    }
};
