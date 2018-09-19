import types from "../../constants";


export const addGroup = ({params,func}) => {
    return dispatch => {
        dispatch({
            type: types.auth.GROUP_ADD,
            params,
            func,
        })
    }
}



export const groupList = () => {
    return dispatch => {
        dispatch({
            type: types.auth.GET_AUTH_GROUPLIST,
        })
    }
}


export const groupDel = ({id,func}) => {
    return dispatch => {
        dispatch({
            type: types.auth.GROUP_DEL,
            params:{
                id
            },
            func,
        })
    }
}


export const groupMemberEdit = ({id,member_ids,func}) => {
    return dispatch => {
        dispatch({
            type: types.auth.GROUP_MEMBER_EDIT,
            params:{
                id,
                member_ids,
            },
            func,
        })
    }
}


export const groupMemberList = ({params}) => {
    return dispatch => {
        dispatch({
            type: types.auth.GET_AUTH_GROUP_MEMBER_LIST,
            params,
        })
    }
}


export const groupAuthInfo = ({id}) => {
    return dispatch => {
        dispatch({
            type: types.auth.GET_GROUP_AUTH_INFO,
            params:{
                id,
            },
        })
    }
}


export const selectRuleids = ({rule_ids}) => {
    return dispatch => {
        const newArray = rule_ids||[]
        const newArray2 = newArray.map((e)=>e)
        dispatch({
            type: types.auth.SET_SELECT_RULE_IDS,
            selectRuleids: newArray2,
        })
    }
}


export const saveAuthRuleids = ({rule_ids,id}) => {
    return dispatch => {
        dispatch({
            type: types.auth.SAVE_AUTH_RULEIDS,
            params:{
                rule_ids,
                id
            },
            func:()=>{
                dispatch(groupAuthInfo({
                    id
                }))
            }
        })
    }
}
