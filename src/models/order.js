import order from "@/services/order";


export default {
    namespace: "order",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: {},
        groupInfo: {},
        setSend: {},
        changePrice: {},
        settingInfo: { result: { info: {} } },
        settingEdit: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(order.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(order.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupInfo({ payload, callback }, { call, put }) {
            const response = yield call(order.groupInfo, payload);
            yield put({
                type: "_groupInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * setSend({ payload, callback }, { call, put }) {
            const response = yield call(order.setSend, payload);
            yield put({
                type: "_setSend",
                payload: response
            });
            if (callback) callback(response);
        },
        * changePrice({ payload, callback }, { call, put }) {
            const response = yield call(order.changePrice, payload);
            yield put({
                type: "_changePrice",
                payload: response
            });
            if (callback) callback(response);
        },
        * settingInfo({ payload, callback }, { call, put }) {
            const response = yield call(order.settingInfo, payload);
            yield put({
                type: "_settingInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * settingEdit({ payload, callback }, { call, put }) {
            const response = yield call(order.settingEdit, payload);
            yield put({
                type: "_settingEdit",
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
        _groupInfo(state, action) {
            return {
                ...state,
                groupInfo: action.payload
            };
        },
        _setSend(state, action) {
            return {
                ...state,
                setSend: action.payload
            };
        },
        _changePrice(state, action) {
            return {
                ...state,
                changePrice: action.payload
            };
        },
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
