import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const OrderApi = {
    list: {
        url: `${ROOT_URL}order/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    info: {
        url: `${ROOT_URL}order/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    setSend: {
        url: `${ROOT_URL}order/setSend`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setOrderExpires: {
        url: `${ROOT_URL}shop/setOrderExpires`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    refund: {
        list: {
            url: `${ROOT_URL}Orderrefund/list`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        info: {
            url: `${ROOT_URL}Orderrefund/info`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        handle:{
            url: `${ROOT_URL}Orderrefund/handle`,
            method: 'POST',
            showLoading: false,
            needLogin: true,
        },
        receive:{
            url: `${ROOT_URL}Orderrefund/receive`,
            method: 'POST',
            showLoading: false,
            needLogin: true,
        }
    }
}
