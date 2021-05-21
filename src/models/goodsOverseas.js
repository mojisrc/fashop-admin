import goodsOverseas from "@/services/goodsOverseas";

export default {
    namespace: "goodsOverseas",
    state: {
        configInfo: {
            result: { info:{} }
        },
        configEdit: {
            result: { }
        },
        pageList: {
            list: [],
            total_number: 0
        }
    },
    effects: {
        * configInfo({ payload, callback }, { call, put }) {
            const response = yield call(goodsOverseas.configInfo, payload);
            yield put({
                type: "_configInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * configEdit({ payload, callback }, { call, put }) {
            const response = yield call(goodsOverseas.configEdit, payload);
            yield put({
                type: "_configEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * pageList({ payload, callback }, { call, put }) {
            const response = yield call(goodsOverseas.pageList, payload);
            yield put({
                type: "_pageList",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _configInfo(state, action) {
            return {
                ...state,
                configInfo: action.payload
            };
        },
        _configEdit(state, action) {
            return {
                ...state,
                configEdit: action.payload
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
