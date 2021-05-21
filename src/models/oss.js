import oss from "@/services/oss";
export default {
    namespace: "oss",
    state: {
        info: {
            result:{
                info:{
                    status:0,
                    sign:"alioss",
                    config:{
                        bucket:"",
                        endpoint:"",
                        access_key_id:"",
                        access_key_secret:""
                    }
                }
            }
        },
        edit: {}
    },
    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(oss.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(oss.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },

    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
    }
};
