import types from '../../constants';

// 设置商品详情
export const setGoodsDetailData = ({data})=>{
    return dispatch => {
        dispatch({
            type : types.goods.SET_GOODS_DETAIL_DATA,
            data
        })
    }
}
