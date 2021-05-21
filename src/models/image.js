import image from "@/services/image";

export default {
    namespace: "image",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        goodsImageList: {
            result: { list: [], total_number: 0 }
        },
        add: {},
        edit: {},
        move: {},
        folderList: {
            result: { list: [], total_number: 0 }
        },
        folderInfo: {
            result: { info: {} }
        },
        folderAdd: {},
        folderEdit: {},
        folderDel: {},
        folderMove: {}
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
        * goodsImageList({ payload, callback }, { call, put }) {
            const response = yield call(image.goodsImageList, payload);
            yield put({
                type: "_goodsImageList",
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
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(image.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(image.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * move({ payload, callback }, { call, put }) {
            const response = yield call(image.move, payload);
            yield put({
                type: "_move",
                payload: response
            });
            if (callback) callback(response);
        },
        * folderList({ payload, callback }, { call, put }) {
            const response = yield call(image.folderList, payload);
            yield put({
                type: "_folderList",
                payload: response
            });
            if (callback) callback(response);
        },
        * folderInfo({ payload, callback }, { call, put }) {
            const response = yield call(image.folderInfo, payload);
            yield put({
                type: "_folderInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * folderAdd({ payload, callback }, { call, put }) {
            const response = yield call(image.folderAdd, payload);
            yield put({
                type: "_folderAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * folderEdit({ payload, callback }, { call, put }) {
            const response = yield call(image.folderEdit, payload);
            yield put({
                type: "_folderEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * folderDel({ payload, callback }, { call, put }) {
            const response = yield call(image.folderDel, payload);
            yield put({
                type: "_folderDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * folderMove({ payload, callback }, { call, put }) {
            const response = yield call(image.folderMove, payload);
            yield put({
                type: "_folderMove",
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
        _goodsImageList(state, action) {
            return {
                ...state,
                goodsImageList: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        _folderList(state, action) {
            return {
                ...state,
                folderList: action.payload
            };
        },
        _folderInfo(state, action) {
            return {
                ...state,
                folderInfo: action.payload
            };
        },
        _folderAdd(state, action) {
            return {
                ...state,
                folderAdd: action.payload
            };
        },
        _folderEdit(state, action) {
            return {
                ...state,
                folderEdit: action.payload
            };
        },
        _folderDel(state, action) {
            return {
                ...state,
                folderDel: action.payload
            };
        },
        _folderMove(state, action) {
            return {
                ...state,
                folderMove: action.payload
            };
        }
    }
};
