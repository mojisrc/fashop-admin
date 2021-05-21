import points from "@/services/points";

export default {
    namespace: "points",
    state: {
        goods: {
            result: { list: [], total_number: 0 }
        },
        logList: {
            result: { list: [], total_number: 0 }
        },
        give: {
            result: {}
        },
        selectableUsers:{
            result: { list: [], total_number: 0 }
        }
    },
    effects: {
        * goods({ payload, callback }, { call, put }) {
            const response = yield call(points.goods, payload);
            yield put({
                type: "_goods",
                payload: response
            });
            if (callback) callback(response);
        },
        * logList({ payload, callback }, { call, put }) {
            const response = yield call(points.logList, payload);
            yield put({
                type: "_logList",
                payload: response
            });
            if (callback) callback(response);
        },
        * give({ payload, callback }, { call, put }) {
            const response = yield call(points.give, payload);
            yield put({
                type: "_give",
                payload: response
            });
            if (callback) callback(response);
        },
        * selectableUsers({ payload, callback }, { call, put }) {
            const response = yield call(points.selectableUsers, payload);
            yield put({
                type: "_selectableUsers",
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
        _logList(state, action) {
            return {
                ...state,
                logList: action.payload
            };
        },
        _give(state, action) {
            return {
                ...state,
                give: action.payload
            };
        },
        _selectableUsers(state, action) {
            return {
                ...state,
                selectableUsers: action.payload
            };
        }
    }
};
