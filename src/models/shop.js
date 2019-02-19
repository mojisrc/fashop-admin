import shop from "@/services/shop";

export default {
    namespace: "shop",
    state: {
        info: {},
        setOrderExpires: {},
        setBaseInfo: {},
        setGoodsCategoryStyle: {},
        setColorScheme: {},
        setPortalTemplate: {}
    },
    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(shop.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * setOrderExpires({ payload, callback }, { call, put }) {
            const response = yield call(shop.setOrderExpires, payload);
            yield put({
                type: "_setOrderExpires",
                payload: response
            });
            if (callback) callback(response);
        },
        * setBaseInfo({ payload, callback }, { call, put }) {
            console.log('111')
            const response = yield call(shop.setBaseInfo, payload);
            yield put({
                type: "_setBaseInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * setGoodsCategoryStyle({ payload, callback }, { call, put }) {
            const response = yield call(shop.setGoodsCategoryStyle, payload);
            yield put({
                type: "_setGoodsCategoryStyle",
                payload: response
            });
            yield put({
                type: "info"
            })
            if (callback) callback(response);
        },
        * setColorScheme({ payload, callback }, { call, put }) {
            const response = yield call(shop.setColorScheme, payload);
            yield put({
                type: "_setColorScheme",
                payload: response
            });
            if (callback) callback(response);
        },
        * setPortalTemplate({ payload, callback }, { call, put }) {
            const response = yield call(shop.setPortalTemplate, payload);
            yield put({
                type: "_setPortalTemplate",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _setOrderExpires(state, action) {
            return {
                ...state,
                setOrderExpires: action.payload
            };
        },
        _setBaseInfo(state, action) {
            return {
                ...state,
                setBaseInfo: action.payload
            };
        },
        _setGoodsCategoryStyle(state, action) {
            return {
                ...state,
                setGoodsCategoryStyle: action.payload
            };
        },
        _setColorScheme(state, action) {
            return {
                ...state,
                setColorScheme: action.payload
            };
        },
        _setPortalTemplate(state, action) {
            return {
                ...state,
                setPortalTemplate: action.payload
            };
        }
    }
};
