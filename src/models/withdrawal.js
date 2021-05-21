import withdrawal from "@/services/withdrawal";

export default {
    namespace: "withdrawal",
    state: {
        settingInfo: { result: { info: {} } },
        settingEdit: {},
        pageList: {
            result: { list: [], total_number: 0 }
        },
    },
    effects: {
        * settingInfo({ payload, callback }, { call, put }) {
            const response = yield call(withdrawal.settingInfo, payload);
            yield put({
                type: "_settingInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * settingEdit({ payload, callback }, { call, put }) {
            const response = yield call(withdrawal.settingEdit, payload);
            yield put({
                type: "_settingEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * pageList({ payload, callback }, { call, put }) {
            const response = yield call(withdrawal.pageList, payload);
            yield put({
                type: "_pageList",
                payload: response
            });
            if (callback) callback(response);
        },

    },
    reducers: {
        _settingInfo(state, action) {
            return {
                ...state,
                settingInfo: action.payload
            };
        },
        _settingEdit(state, action) {
            return {
                ...state,
                settingEdit: action.payload
            };
        },
        _pageList(state, action) {
            return {
                ...state,
                pageList: action.payload
            };
        },
    }
};
