import user from "@/services/user";

export default {
    namespace: "user1",
    state: {
        list: {},
        info: {},
        address: {},
        statistics: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(user.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(user.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * address({ payload, callback }, { call, put }) {
            const response = yield call(user.address, payload);
            yield put({
                type: "_address",
                payload: response
            });
            if (callback) callback(response);
        },
        * statistics({ payload, callback }, { call, put }) {
            const response = yield call(user.statistics, payload);
            yield put({
                type: "_statistics",
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
        _address(state, action) {
            return {
                ...state,
                address: action.payload
            };
        },
        _statistics(state, action) {
            return {
                ...state,
                statistics: action.payload
            };
        }
    }
};
