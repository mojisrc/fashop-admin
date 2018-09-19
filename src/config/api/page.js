import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const PageApi = {
    list:{
        url: `${ROOT_URL}page/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    info:{
        url: `${ROOT_URL}page/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    add:{
        url: `${ROOT_URL}page/add`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    edit:{
        url: `${ROOT_URL}page/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setPortal:{
        url: `${ROOT_URL}page/setPortal`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
