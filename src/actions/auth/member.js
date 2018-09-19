import types from "../../constants";

export const startGetMemberList = () => {
    return dispatch => {
        dispatch({
            type: types.member.MEMBER_LIST_LOADING,
        })
    }
}


export const getMemberList = () => {
    return dispatch => {
        dispatch({
            type: types.member.GET_MEMBER_LIST,
        })
    }
}


export const setMemberList = ({data}) => {
    return dispatch => {
        dispatch({
            type: types.member.SET_MEMBER_LIST,
            data,
        })
    }
}


export const addMemberButtonLoading = ({loading}) => {
    return dispatch => {
        dispatch({
            type: types.member.MEMBER_ADD_START,
            loading,
        })
    }
}


export const editMemberButtonLoading = ({loading}) => {
    return dispatch => {
        dispatch({
            type: types.member.MEMBER_EDIT_START,
            loading,
        })
    }
}


export const delMember = ({id}) => {
    return dispatch => {
        dispatch({
            type: types.member.MEMBER_DEL,
            params:{id},
        })
    }
}
