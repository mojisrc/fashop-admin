import types from '../constants';

const initialState = {
    loading : false,
    list: [],
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.shipper.START_GET_SHIPPER_LIST:
            return Object.assign({}, state, {
                loading: true
            })
        case types.shipper.SET_SHIPPER_LIST:
            return Object.assign({}, state, {
                listData: action.data,
                loading: false,
            })
        case types.shipper.SET_SHIPPER_INFO:
            return Object.assign({}, state, {
                infoData: action.data,
            })
        default:
            return state;
    }
}
