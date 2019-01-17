import image from "@/services/image";

export default {
    namespace: "image",
    state: {
        list: {
            result: { list: [] ,total_number:0 }
        },
        goodsImageList: {
            result: { list: [] ,total_number:0 }
        },
        add: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(image.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * goodsImageList({ payload, callback }, { call, put }) {
            const response = yield call(image.goodsImageList, payload);
            yield put({
                type: "_goodsImageList",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(image.add, payload);
            yield put({
                type: "_add",
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
        _goodsImageList(state, action) {
            return {
                ...state,
                goodsImageList: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        }
    }
};
