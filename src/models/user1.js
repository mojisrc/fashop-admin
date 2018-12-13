import user from "@/services/user";

export default {
    namespace: "user",
    state: {
        list: {},
        info: {},
        address: {},
        statistics: {}
    },
    effects: {
        * list({ payload }, { call, put }) {
            const response = yield call(user.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * info({ payload }, { call, put }) {
            const response = yield call(user.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        },
        * address({ payload }, { call, put }) {
            const response = yield call(user.address, payload);
            yield put({
                type: "address",
                payload: response
            });
        },
        * statistics({ payload }, { call, put }) {
            const response = yield call(user.statistics, payload);
            yield put({
                type: "statistics",
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
        address(state, action) {
            return {
                ...state,
                address: action.payload
            };
        },
        statistics(state, action) {
            return {
                ...state,
                statistics: action.payload
            };
        }
    }
};
