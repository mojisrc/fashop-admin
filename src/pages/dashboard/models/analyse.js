import types from '../../../constants/index';

export const sendDataInfor = () => {
    return dispatch => {
        dispatch({
            type:types.statistics.DATAINFORMATION_SURVEY,
        })
    }
}

export const getDataInfor = ({result}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.GETDATAINFORMATION_SURVEY,
            dataInfor:result
        })
    }
}

export const monthSaleChart = ({params}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.MONTH_SALE_CHART,
            params
        })
    }
}

export const monthOrderChart = ({params}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.BARGRAPHMONTHLY_SURVEY,
            params
        })
    }
}

export const customerGrowthChart = ({params}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.BARGRAPHCUST_SURVEY,
            params
        })
    }
}

export const newCustomerCostChart = ({params}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.BARGRAPHNEWCUST_SURVEY,
            params
        })
    }
}

export const getChartData = ({result}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.GET_MONTH_SALE_CHART,
            saleInfo:result
        })
    }
}

export const sendSaleAccumulative = ({params}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.SALEACCUMULATIVE_SURVEY,
            params
        })
    }
}

export const getSaleAccumulative = ({result}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.GET_SALEACCUMULATIVE_SURVEY,
            accumulativeCount:result
        })
    }
}

export const sendDayAverage = ({params}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.SALEDAYAVERAGE_SURVEY,
            params
        })
    }
}

export const getDayAverage = ({result}) => {
    return dispatch => {
        dispatch({
            type:types.statistics.GETSALEDAYAVERAGE_SURVEY,
            saleDayAver:result
        })
    }
}
