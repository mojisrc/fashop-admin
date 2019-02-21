import coupon from "@/services/coupon";

export default {
    namespace: "coupon",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        // add: {},
        // del: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(coupon.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        // * add({ payload, callback }, { call, put }) {
        //     const response = yield call(coupon.add, payload);
        //     yield put({
        //         type: "_add",
        //         payload: response
        //     });
        //     if (callback) callback(response);
        // },
        // * del({ payload, callback }, { call, put }) {
        //     const response = yield call(coupon.del, payload);
        //     yield put({
        //         type: "_del",
        //         payload: response
        //     });
        //     if (callback) callback(response);
        // }
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        // _add(state, action) {
        //     return {
        //         ...state,
        //         add: action.payload
        //     };
        // },
        // _del(state, action) {
        //     return {
        //         ...state,
        //         del: action.payload
        //     };
        // }
    }
};
