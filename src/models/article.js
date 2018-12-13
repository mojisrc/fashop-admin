import area from "@/services/area";

export default {
    namespace: "article",
    state: {
        list: [],
        info: []
    },
    effects: {
        * list({ payload }, { call, put }) {
            const response = yield call(area.list, payload);
            yield put({
                type: "list",
                payload: response
            });
        },
        * info({ payload }, { call, put }) {
            const response = yield call(area.list, payload);
            yield put({
                type: "info",
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
        info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        }
    }
}
