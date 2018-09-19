import types from '../../constants';
import { Fetch } from "../../utils";
import { ExpressApi } from "../../config/api/express"


export const getExpressList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.express.GET_EXPRESS_LIST,
            params,
        })
    }
}

export const getExpressInfo = ({ params }) => {
    return Fetch.fetch({ api:ExpressApi.info,params})
}

export const setExpressList = ({params,result})=>{
    return dispatch => {
        const {
            page,
            rows,
        } = params
        const {
            total_number,
            list,
        } = result
        dispatch({
            type: types.express.SET_EXPRESS_LIST,
            data: {
                page,
                rows,
                total_number,
                list,
            },
        })
    }
}


export const setExpressInfo = ({result})=>{
    return dispatch => {
        dispatch({
            type : types.express.SET_EXPRESS_INFO,
            data:result
        })
    }
}

export const addExpress = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.express.ADD_EXPRESS,
            params,
        })
    }
}


export const editExpress = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.express.EDIT_EXPRESS,
            params,
        })
    }
}


export const delExpress = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.express.DEL_EXPRESS,
            params,
        })
    }
}

export const setExpressIsCommonlyUse = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.express.SET_EXPRESS_IS_COMMONLY_USE,
            params,
        })
    }
}



