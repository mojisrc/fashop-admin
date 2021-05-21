import alipay from "@/services/alipay";

export default {
    namespace: "alipay",
    state: {
        settingInfo: { result: { info: {} } },
        settingEdit: {},


    },
    effects: {
        * settingInfo({ payload, callback }, { call, put }) {
            const response = yield call(alipay.settingInfo, payload);
            yield put({
                type: "_settingInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * settingEdit({ payload, callback }, { call, put }) {
            const response = yield call(alipay.settingEdit, payload);
            yield put({
                type: "_settingEdit",
                payload: response
            });
            if (callback) callback(response);
        }
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
        }
    }
};
