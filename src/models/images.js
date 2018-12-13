import images from "@/services/images";

export default {
    namespace: "images",
    state: {
        list: {},
        add: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(images.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback();
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(images.add, payload);
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
