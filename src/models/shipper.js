import shipper from "@/services/shipper";

export default {
    namespace: "shipper",
    state: {
        list: {},
        info: {},
        add: {},
        edit: {},
        del: {}
    },
    effects: {
        * list({ payload }, { call, put }) {
            const response = yield call(shipper.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * info({ payload }, { call, put }) {
            const response = yield call(shipper.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(shipper.add, payload);
            yield put({
                type: "add",
                payload: response
            });
        },
        * edit({ payload }, { call, put }) {
            const response = yield call(shipper.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
        },
        * del({ payload }, { call, put }) {
            const response = yield call(shipper.del, payload);
            yield put({
                type: "del",
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
        }
    }
};
