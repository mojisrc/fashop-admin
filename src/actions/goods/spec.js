import types from '../../constants';
export const getGoodsSpecList = ()=>{
    return dispatch => {
        dispatch({
            type : types.goods.GET_GOODS_SPEC_LIST,
        })
    }
}

export const setGoodsSpecList = ({list})=>{
    return dispatch => {
        dispatch({
            type: types.goods.SET_GOODS_SPEC_LIST,
            list,
        })
    }
}
