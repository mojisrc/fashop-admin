import auth from "@/services/auth";

export default {
    namespace: "auth",
    state: {
        moduleList: {
            result: { list: [], total_number: 0 }
        },
        actionList: {
            result: { list: [], total_number: 0 }
        },
        policyList: {
            result: { list: [], total_number: 0 }
        },
        policyInfo: {
            result: { info: [] }
        },
        policyAdd: {
            result: { list: [], total_number: 0 }
        },
        policyEdit: {
            result: { list: [], total_number: 0 }
        },
        policyDel: {
            result: { list: [], total_number: 0 }
        },
        groupList: {
            result: { list: [], total_number: 0 }
        },
        groupAdd: {
            result: { list: [], total_number: 0 }
        },
        groupEdit: {
            result: { list: [], total_number: 0 }
        },
        groupInfo: {
            result: { info: [] }
        },
        groupDel: {
            result: { list: [], total_number: 0 }
        },
        groupPolicyList: {
            result: { list: [], total_number: 0 }
        },
        groupPolicyAdd: {
            result: { list: [], total_number: 0 }
        },
        groupPolicyDel: {
            result: { list: [], total_number: 0 }
        },
        groupMemberList: {
            result: { list: [], total_number: 0 }
        },
        groupMemberAdd: {
            result: { list: [], total_number: 0 }
        },
        groupMemberDel: {
            result: { list: [], total_number: 0 }
        },
        userList: {
            result: { list: [], total_number: 0 }
        },
        selfPolicy: {
            result: { list: [], total_number: 0 }
        }

    },
    effects: {
        * moduleList({ payload, callback }, { call, put }) {
            const response = yield call(auth.moduleList, payload);
            yield put({
                type: "_moduleList",
                payload: response
            });
            if (callback) callback(response);
        },
        * actionList({ payload, callback }, { call, put }) {
            const response = yield call(auth.actionList, payload);
            yield put({
                type: "_actionList",
                payload: response
            });
            if (callback) callback(response);
        },
        * policyList({ payload, callback }, { call, put }) {
            const response = yield call(auth.policyList, payload);
            yield put({
                type: "_policyList",
                payload: response
            });
            if (callback) callback(response);
        },
        * policyInfo({ payload, callback }, { call, put }) {
            const response = yield call(auth.policyInfo, payload);
            yield put({
                type: "_policyInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * policyAdd({ payload, callback }, { call, put }) {
            const response = yield call(auth.policyAdd, payload);
            yield put({
                type: "_policyAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * policyEdit({ payload, callback }, { call, put }) {
            const response = yield call(auth.policyEdit, payload);
            yield put({
                type: "_policyEdit",
                payload: response
            });
            if (callback) callback(response);
        },
        * policyDel({ payload, callback }, { call, put }) {
            const response = yield call(auth.policyDel, payload);
            yield put({
                type: "_policyDel",
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
        * groupInfo({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupInfo, payload);
            yield put({
                type: "_groupInfo",
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
        * groupPolicyList({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupPolicyList, payload);
            yield put({
                type: "_groupPolicyList",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupPolicyAdd({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupPolicyAdd, payload);
            yield put({
                type: "_groupPolicyAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupPolicyDel({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupPolicyDel, payload);
            yield put({
                type: "_groupPolicyDel",
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
        },
        * groupMemberAdd({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupMemberAdd, payload);
            yield put({
                type: "_groupMemberAdd",
                payload: response
            });
            if (callback) callback(response);
        },
        * groupMemberDel({ payload, callback }, { call, put }) {
            const response = yield call(auth.groupMemberDel, payload);
            yield put({
                type: "_groupMemberDel",
                payload: response
            });
            if (callback) callback(response);
        },
        * userList({ payload, callback }, { call, put }) {
            const response = yield call(auth.userList, payload);
            yield put({
                type: "_userList",
                payload: response
            });
            if (callback) callback(response);
        },
        * selfPolicy({ payload, callback }, { call, put }) {
            const response = yield call(auth.selfPolicy, payload);
            yield put({
                type: "_selfPolicy",
                payload: response
            });
            if (callback) callback(response);
        }

    },
    reducers: {
        _moduleList(state, action) {
            return {
                ...state,
                moduleList: action.payload
            };
        },
        _actionList(state, action) {
            return {
                ...state,
                actionList: action.payload
            };
        },
        _policyList(state, action) {
            return {
                ...state,
                policyList: action.payload
            };
        },
        _policyInfo(state, action) {
            return {
                ...state,
                policyInfo: action.payload
            };
        },
        _policyAdd(state, action) {
            return {
                ...state,
                policyAdd: action.payload
            };
        },
        _policyEdit(state, action) {
            return {
                ...state,
                policyEdit: action.payload
            };
        },
        _policyDel(state, action) {
            return {
                ...state,
                policyDel: action.payload
            };
        },
        _groupList(state, action) {
            return {
                ...state,
                groupList: action.payload
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
        _groupInfo(state, action) {
            return {
                ...state,
                groupInfo: action.payload
            };
        },
        _groupDel(state, action) {
            return {
                ...state,
                groupDel: action.payload
            };
        },
        _groupPolicyList(state, action) {
            return {
                ...state,
                groupPolicyList: action.payload
            };
        },
        _groupPolicyAdd(state, action) {
            return {
                ...state,
                groupPolicyAdd: action.payload
            };
        },
        _groupPolicyDel(state, action) {
            return {
                ...state,
                groupPolicyDel: action.payload
            };
        },
        _groupMemberList(state, action) {
            return {
                ...state,
                groupMemberList: action.payload
            };
        },
        _groupMemberAdd(state, action) {
            return {
                ...state,
                groupMemberAdd: action.payload
            };
        },
        _groupMemberDel(state, action) {
            return {
                ...state,
                groupMemberDel: action.payload
            };
        },
        _userList(state, action) {
            return {
                ...state,
                userList: action.payload
            };
        },
        _selfPolicy(state, action) {
            return {
                ...state,
                selfPolicy: action.payload
            };
        }

    }
};
