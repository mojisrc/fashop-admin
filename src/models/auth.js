import auth from "@/services/auth";

export default {
    namespace: "auth",
    state: {
        setRuleTree: {},
        groupAuthorise: {},
        ruleTree: {},
        groupList: {},
        groupInfo: {},
        groupAdd: {},
        groupEdit: {},
        groupDel: {},
        groupMemberList: {}
    },
    effects: {
        * groupAuthorise({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupAuthorise, payload);
            yield put({
                type: "_groupAuthorise",
                payload: response
            });
            if (callback) callback(response);
        },
        * ruleTree({ payload, callback }, { call, put }) {
            const response = yield call(auth.ruleTree, payload);
            yield put({
                type: "_ruleTree",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupList({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupList, payload);
            yield put({
                type: "_groupList",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupInfo({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupInfo, payload);
            yield put({
                type: "_groupInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupAdd({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupAdd, payload);
            yield put({
                type: "_groupAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupEdit({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupEdit, payload);
            yield put({
                type: "_groupEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupDel({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupDel, payload);
            yield put({
                type: "_groupDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupMemberList({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupMemberList, payload);
            yield put({
                type: "_groupMemberList",
                payload: response
            });
            if (callback) callback(response);
        }
    },

    reducers: {
        _setRuleTree(state, action) {
            return {
                ...state,
                setRuleTree: action.payload
            };
        },
        _groupAuthorise(state, action) {
            return {
                ...state,
                groupAuthorise: action.payload
            };
        },
        _ruleTree(state, action) {
            return {
                ...state,
                ruleTree: action.payload
            };
        },
        _groupList(state, action) {
            return {
                ...state,
                groupList: action.payload
            };
        },
        _groupInfo(state, action) {
            return {
                ...state,
                groupInfo: action.payload
            };
        },
        _groupAdd(state, action) {
            return {
                ...state,
                groupAdd: action.payload
            };
        },
        _groupEdit(state, action) {
            return {
                ...state,
                groupEdit: action.payload
            };
        },
        _groupDel(state, action) {
            return {
                ...state,
                groupDel: action.payload
            };
        },
        _groupMemberList(state, action) {
            return {
                ...state,
                groupMemberList: action.payload
            };
        }
    }
};
