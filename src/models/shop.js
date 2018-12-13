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
            if (callback) callback();
        },
        * setOrderExpires({ payload, callback }, { call, put }) {
            const response = yield call(shop.setOrderExpires, payload);
            yield put({
                type: "setOrderExpires",
                payload: response
            });
            if (callback) callback();
        },
        * setBaseInfo({ payload, callback }, { call, put }) {
            const response = yield call(shop.setBaseInfo, payload);
            yield put({
                type: "setBaseInfo",
                payload: response
            });
            if (callback) callback();
        },
        * setGoodsCategoryStyle({ payload, callback }, { call, put }) {
            const response = yield call(shop.setGoodsCategoryStyle, payload);
            yield put({
                type: "setGoodsCategoryStyle",
                payload: response
            });
            if (callback) callback();
        },
        * setColorScheme({ payload, callback }, { call, put }) {
            const response = yield call(shop.setColorScheme, payload);
            yield put({
                type: "setColorScheme",
                payload: response
            });
            if (callback) callback();
        },
        * setPortalTemplate({ payload, callback }, { call, put }) {
            const response = yield call(shop.setPortalTemplate, payload);
            yield put({
                type: "setPortalTemplate",
                payload: response
            });
            if (callback) callback();
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
