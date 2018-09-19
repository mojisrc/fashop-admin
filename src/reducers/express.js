import types from '../constants';

const initialState = {
    loading: false,
    list: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.express.START_GET_EXPRESS_LIST:
            return Object.assign({}, state, {
                loading: true
            })
        case types.express.SET_EXPRESS_LIST:
            return Object.assign({}, state, {
                listData: action.data,
                loading: false,
            })
        case types.express.SET_EXPRESS_INFO:
            return Object.assign({}, state, {
                infoData: action.data,
            })
        default:
            return state;
    }
}
