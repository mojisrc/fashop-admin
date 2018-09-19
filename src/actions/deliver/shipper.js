import types from '../../constants';
import { Fetch } from "../../utils";
import { ShipperApi } from "../../config/api/shipper"


export const getShipperList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.shipper.GET_SHIPPER_LIST,
            params,
        })
    }
}

export const getShipperInfo = ({ params }) => {
    return Fetch.fetch({ api:ShipperApi.info,params})
}

export const setShipperList = ({params,result})=>{
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
            type: types.shipper.SET_SHIPPER_LIST,
            data: {
                page,
                rows,
                total_number,
                list,
            },
        })
    }
}


export const setShipperInfo = ({result})=>{
    return dispatch => {
        dispatch({
            type : types.shipper.SET_SHIPPER_INFO,
            data:result
        })
    }
}

export const addShipper = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shipper.ADD_SHIPPER,
            params,
        })
    }
}


export const editShipper = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shipper.EDIT_SHIPPER,
            params,
        })
    }
}


export const delShipper = ({ params }) => {
    return dispatch => {
        dispatch({
            type: types.shipper.DEL_SHIPPER,
            params,
        })
    }
}



