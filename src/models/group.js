import group from "@/services/group";

export default {
    namespace: "group",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        // add: {},
        // del: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(group.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        // * add({ payload, callback }, { call, put }) {
        //     const response = yield call(group.add, payload);
        //     yield put({
        //         type: "_add",
        //         payload: response
        //     });
        //     if (callback) callback(response);
        // },
        // * del({ payload, callback }, { call, put }) {
        //     const response = yield call(group.del, payload);
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
