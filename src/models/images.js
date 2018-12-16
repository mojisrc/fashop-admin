import image from "@/services/image";

export default {
    namespace: "image",
    state: {
        list: {},
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
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        }
    }
};
