import images from "@/services/images";

export default {
    namespace: "images",
    state: {
        list: {},
        add: {}
    },
    effects: {
        * list({ payload }, { call, put }) {
            const response = yield call(images.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(images.add, payload);
            yield put({
                type: "add",
                payload: response
            });
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
