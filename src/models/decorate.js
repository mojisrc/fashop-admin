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
        * list({ payload }, { call, put }) {
            const response = yield call(page.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * info({ payload }, { call, put }) {
            const response = yield call(page.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        },
        * setPagePortal({ payload }, { call, put }) {
            const response = yield call(page.setPagePortal, payload);
            yield put({
                type: "setPagePortal",
                payload: response
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(page.add, payload);
            yield put({
                type: "add",
                payload: response
            });
        },
        * edit({ payload }, { call, put }) {
            const response = yield call(page.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
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
