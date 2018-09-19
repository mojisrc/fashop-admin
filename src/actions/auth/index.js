import types from "../../constants";

export const setRuleTree = (e)=>{
    return dispatch => {
        let list = []
        const newArray = e.map((item)=>{
            const newItem = {...item}
            delete newItem._child
            list.push(newItem)
            const newArray2 = item._child.map((tom)=>{
                delete tom._child
                list.push(tom)
            })
        })
        dispatch({
            type : types.auth.SET_RULE_TREE,
            authTree: e,
            authTreeMap: list,
        })
    }
}


export const getRuleTree = ()=>{
    return dispatch => {
        dispatch({
            type : types.auth.GET_RULE_TREE,
        })
    }
}
