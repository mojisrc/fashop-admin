import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const ExpressApi ={
    list:{
        url: `${ROOT_URL}express/list`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    info:{
        url: `${ROOT_URL}express/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    add:{
        url: `${ROOT_URL}express/add`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    edit:{
        url: `${ROOT_URL}express/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    del:{
        url: `${ROOT_URL}express/del`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setCommonlyUse:{
        url: `${ROOT_URL}express/setCommonlyUse`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
