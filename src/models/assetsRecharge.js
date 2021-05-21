import assetswithdrawal from "@/services/assetsRecharge";

export default {
    namespace: "assetsRecharge",
    state: {
        list: {
            result: { list: [] ,total_number:0 }
        },
        info: {},
        add: {},
        edit: {},
        del: {},
        pass: {},
        refuse: {},
        payment: {},
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(assetswithdrawal.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
    }
};
