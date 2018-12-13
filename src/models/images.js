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
                type: "list",
                payload: response
            });
            if (callback) callback();
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(image.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback();
        }
    },
    reducers: {
        list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        }
    }
};
