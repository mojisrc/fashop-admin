import types from '../constants';

const initialState = {
    authTree: [],
    authTreeMap: [],
    groupListLoading: true,
    groupList: [],
    groupMemberList: [],
    groupMemberListLoading: false,
    selectRuleids: [],
}
export default  (state = initialState, action)=>{
    switch (action.type) {
        case types.auth.SET_RULE_TREE:
            return Object.assign({}, state, {
                authTree: action.authTree,
                authTreeMap: action.authTreeMap,
            })

        case types.auth.SET_AUTH_GROUPLIST:
            return Object.assign({}, state, {
                groupListLoading: false,
                groupList: action.data,
            })
        case types.auth.SET_AUTH_GROUP_MEMBER_LIST:
            return Object.assign({}, state, {
                groupMemberListLoading: false,
                groupMemberList: action.data,
            })
        case types.auth.GROUP_MEMBER_LIST_LOADING:
            return Object.assign({}, state, {
                groupMemberListLoading: true,
            })
        case types.auth.SET_SELECT_RULE_IDS:
            return Object.assign({}, state, {
                selectRuleids: action.selectRuleids,
            })
        default:
            return state;
    }
}
