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
        * groupAuthorise({ payload }, { call, put }) {
            const response = yield call(auth.groupAuthorise, payload);
            yield put({
                type: "groupAuthorise",
                payload: response
            });
        },
        * ruleTree({ payload }, { call, put }) {
            const response = yield call(auth.ruleTree, payload);
            yield put({
                type: "ruleTree",
                payload: response
            });
        },
        * groupList({ payload }, { call, put }) {
            const response = yield call(auth.groupList, payload);
            yield put({
                type: "groupList",
                payload: response
            });
        },
        * groupInfo({ payload }, { call, put }) {
            const response = yield call(auth.groupInfo, payload);
            yield put({
                type: "groupInfo",
                payload: response
            });
        },
        * groupAdd({ payload }, { call, put }) {
            const response = yield call(auth.groupAdd, payload);
            yield put({
                type: "groupAdd",
                payload: response
            });
        },
        * groupEdit({ payload }, { call, put }) {
            const response = yield call(auth.groupEdit, payload);
            yield put({
                type: "groupEdit",
                payload: response
            });
        },
        * groupDel({ payload }, { call, put }) {
            const response = yield call(auth.groupDel, payload);
            yield put({
                type: "groupDel",
                payload: response
            });
        },
        * groupMemberList({ payload }, { call, put }) {
            const response = yield call(auth.groupMemberList, payload);
            yield put({
                type: "groupMemberList",
                payload: response
            });
        }
    },

    reducers: {
        setRuleTree(state, action) {
            return {
                ...state,
                setRuleTree: action.payload
            };
        },
        groupAuthorise(state, action) {
            return {
                ...state,
                groupAuthorise: action.payload
            };
        },
        ruleTree(state, action) {
            return {
                ...state,
                ruleTree: action.payload
            };
        },
        groupList(state, action) {
            return {
                ...state,
                groupList: action.payload
            };
        },
        groupInfo(state, action) {
            return {
                ...state,
                groupInfo: action.payload
            };
        },
        groupAdd(state, action) {
            return {
                ...state,
                groupAdd: action.payload
            };
        },
        groupEdit(state, action) {
            return {
                ...state,
                groupEdit: action.payload
            };
        },
        groupDel(state, action) {
            return {
                ...state,
                groupDel: action.payload
            };
        },
        groupMemberList(state, action) {
            return {
                ...state,
                groupMemberList: action.payload
            };
        }
    }
};
