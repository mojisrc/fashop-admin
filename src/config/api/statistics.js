import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const StatisticsApi = {
    quantity:{
        url: `${ROOT_URL}Statistics/quantity`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    },
    monthSalesHistogram:{
        url: `${ROOT_URL}Statistics/monthSalesHistogram`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    },
    monthOrderCountHistogram:{
        url: `${ROOT_URL}Statistics/monthOrderCountHistogram`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    },
    monthUserAddCountHistogram:{
        url: `${ROOT_URL}Statistics/monthUserAddCountHistogram`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    },
    monthNewUserSalesHistogram:{
        url: `${ROOT_URL}Statistics/monthNewUserSalesHistogram`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    },
    saleAccumulativeAmount:{
        url: `${ROOT_URL}Statistics/saleAccumulativeAmount`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    },
    dayAverage:{
        url: `${ROOT_URL}Statistics/dayAverage`,
        method: 'GET',
        showLoading: true,
        needLogin: true,
    }
}
