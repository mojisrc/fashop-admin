import { query as queryUsers, queryCurrent } from "@/services/user";
import user from "@/services/user";

export default {
    namespace: "user",

    state: {
        currentUser: {},
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        address: {},
        statistics: {
            result: {
                info: {
                    refund_times: 0,
                    refund_total: 0,
                    buy_times: 0,
                    cost_average: 0,
                    cost_total: 0
                }
            }
        }
    },

    effects: {
        * fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: "save",
                payload: response
            });
        },
        * fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrent);
            yield put({
                type: "saveCurrentUser",
                payload: response
            });
        },
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
        save(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload || {}
            };
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount
                }
            };
        },
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
