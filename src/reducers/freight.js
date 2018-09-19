import types from '../constants';

const initialState = {
    loading: false,
    listData: {
        page: 1,
        rows: 10,
        total_number: 0,
        list: [],
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.freight.START_GET_FREIGHT_LIST:
            return Object.assign({}, state, {
                loading: true
            })
        case types.freight.SET_FREIGHT_LIST:
            return Object.assign({}, state, {
                listData: action.data,
                loading: false
            })
        case types.freight.SET_FREIGHT_INFO:
            return Object.assign({}, state, {
                infoData: action.data,
            })
        default:
            return state;
    }
}
