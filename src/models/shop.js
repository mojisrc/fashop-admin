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
                type: "info",
                payload: response
            });
            if (callback) callback(response);
        },
        * setOrderExpires({ payload, callback }, { call, put }) {
            const response = yield call(shop.setOrderExpires, payload);
            yield put({
                type: "setOrderExpires",
                payload: response
            });
            if (callback) callback(response);
        },
        * setBaseInfo({ payload, callback }, { call, put }) {
            const response = yield call(shop.setBaseInfo, payload);
            yield put({
                type: "setBaseInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * setGoodsCategoryStyle({ payload, callback }, { call, put }) {
            const response = yield call(shop.setGoodsCategoryStyle, payload);
            yield put({
                type: "setGoodsCategoryStyle",
                payload: response
            });
            if (callback) callback(response);
        },
        * setColorScheme({ payload, callback }, { call, put }) {
            const response = yield call(shop.setColorScheme, payload);
            yield put({
                type: "setColorScheme",
                payload: response
            });
            if (callback) callback(response);
        },
        * setPortalTemplate({ payload, callback }, { call, put }) {
            const response = yield call(shop.setPortalTemplate, payload);
            yield put({
                type: "setPortalTemplate",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        setOrderExpires(state, action) {
            return {
                ...state,
                setOrderExpires: action.payload
            };
        },
        setBaseInfo(state, action) {
            return {
                ...state,
                setBaseInfo: action.payload
            };
        },
        setGoodsCategoryStyle(state, action) {
            return {
                ...state,
                setGoodsCategoryStyle: action.payload
            };
        },
        setColorScheme(state, action) {
            return {
                ...state,
                setColorScheme: action.payload
            };
        },
        setPortalTemplate(state, action) {
            return {
                ...state,
                setPortalTemplate: action.payload
            };
        }
    }
};
