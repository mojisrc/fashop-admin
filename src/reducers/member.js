import types from '../constants';

const initialState = {
    // user state
    login : false,
    userInfo : null,
    couponNum : 0,
    refreshing : false,
    orderNum : {
        order_nopay : 0,
        order_nosend : 0,
        order_noreceiving : 0,
        order_noeval : 0,
        order_refund : 0,
    },
    fetchLoginLoading: false,
    // member manager
    memberList: {
        list: [],
        total_number: 0,
    },
    memberListLoading: false,
    memberAddLoading: false,
    memberEditLoading: false,
}

export default function webIndex(state = initialState, action) {
    switch (action.type) {
        case types.member.USER_STATUS_CHANGE:
            return Object.assign({}, state, {
                login: action.login,
                userInfo: action.userInfo,
            })
        case types.member.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                refreshing: action.refreshing,
            })
        case types.member.GET_USER_MIXEDSTATENUM_DATA:
            return Object.assign({}, state, {
                couponNum: action.couponNum,
                orderNum : action.orderNum,
            })
        case types.member.UPDATE_USER_INFO_LOADING:
            return Object.assign({}, state, {
                refreshing: action.refreshing,
            })
        case types.member.FETCH_LOGIN_LOADING:
            return Object.assign({}, state, {
                fetchLoginLoading: action.loading,
            })
        case types.member.SENDREDUCER_USERINFO:
            return Object.assign({}, state, {
                userInfo: action.userinfos,
            })
        // member manager
        case types.member.SET_MEMBER_LIST:
            return Object.assign({}, state, {
                memberListLoading: false,
                memberList: action.data,
            })
        case types.member.GET_MEMBER_LIST:
            return Object.assign({}, state, {
                memberListLoading: true,
            })
        case types.member.MEMBER_ADD_START:
            return Object.assign({}, state, {
                memberAddLoading: action.loading,
            })
        case types.member.MEMBER_EDIT_START:
            return Object.assign({}, state, {
                memberEditLoading: action.loading,
            })
        default:
            return state;
    }
}
