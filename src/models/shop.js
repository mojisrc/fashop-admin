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
        * info({ payload }, { call, put }) {
            const response = yield call(shop.info, payload);
            yield put({
                type: "info",
                payload: response
            });
        },
        * setOrderExpires({ payload }, { call, put }) {
            const response = yield call(shop.setOrderExpires, payload);
            yield put({
                type: "setOrderExpires",
                payload: response
            });
        },
        * setBaseInfo({ payload }, { call, put }) {
            const response = yield call(shop.setBaseInfo, payload);
            yield put({
                type: "setBaseInfo",
                payload: response
            });
        },
        * setGoodsCategoryStyle({ payload }, { call, put }) {
            const response = yield call(shop.setGoodsCategoryStyle, payload);
            yield put({
                type: "setGoodsCategoryStyle",
                payload: response
            });
        },
        * setColorScheme({ payload }, { call, put }) {
            const response = yield call(shop.setColorScheme, payload);
            yield put({
                type: "setColorScheme",
                payload: response
            });
        },
        * setPortalTemplate({ payload }, { call, put }) {
            const response = yield call(shop.setPortalTemplate, payload);
            yield put({
                type: "setPortalTemplate",
                payload: response
            });
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
