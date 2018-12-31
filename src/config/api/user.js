import { env } from '../root';

const ROOT_URL = `${env.domain}/admin/`;
export const UserApi = {
    list: {
        url: `${ROOT_URL}user/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    info: {
        url: `${ROOT_URL}user/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    address: {
        url: `${ROOT_URL}user/address`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    statistics:{
        url: `${ROOT_URL}user/statistics`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    edit:{
        url: `${ROOT_URL}user/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    retailInfo:{
        url: `${ROOT_URL}user/retailInfo`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    }
}
