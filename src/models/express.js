import express from "@/services/express";

export default {
    namespace: "express",
    state: {
        list: {},
        info: {},
        add: {},
        edit: {},
        del: {},
        setIsCommonlyUse: {}
    },
    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(express.list, payload);
            yield put({
                type: "list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(express.info, payload);
            yield put({
                type: "info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(express.add, payload);
            yield put({
                type: "add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(express.edit, payload);
            yield put({
                type: "edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(express.del, payload);
            yield put({
                type: "del",
                payload: response
            });
        },
        * setIsCommonlyUse({ payload, callback }, { call, put }) {
            const response = yield call(express.setIsCommonlyUse, payload);
            yield put({
                type: "setIsCommonlyUse",
                payload: response
            });
            if (callback) callback(response);
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
        },
        add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        setIsCommonlyUse(state, action) {
            return {
                ...state,
                setIsCommonlyUse: action.payload
            };
        }
    }
};
