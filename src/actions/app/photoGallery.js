import types from '../../constants';


export const getPhotoGalleryList = ({params})=>{
    return dispatch => {
        dispatch({
            type : types.app.GET_GOODS_IMAGE_LIST,
            params,
        })
    }
}


export const setGoodsList = ({params,result,loading})=>{
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
            type: types.app.SET_GOODS_IMAGE_LIST,
            data: {
                page,
                rows,
                total_number,
                list,
                loading,
            },
        })
    }
}
