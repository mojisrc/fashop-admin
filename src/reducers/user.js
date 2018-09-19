import types from '../constants';

const initialState = {
    userListLoading: false,
    userListParams: {},
    userList:{},
    userInfo:{},
}

export default  (state = initialState, action)=> {
    switch (action.type) {
        case types.user.START_GET_USER_LIST:
            return Object.assign({}, state, {
                userListLoading: true,
                userListParams: action.userListParams,
            })
        case types.user.SAVE_USER_LIST:
            return Object.assign({}, state, {
                userList: action.userList,
                userListLoading: false,
            })
        case types.user.SAVE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
            })
        default:
            return state;
    }
}
