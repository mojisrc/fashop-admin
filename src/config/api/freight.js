import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const FreightApi ={
    list:{
        url: `${ROOT_URL}freight/list`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    info:{
        url: `${ROOT_URL}freight/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    add:{
        url: `${ROOT_URL}freight/add`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    edit:{
        url: `${ROOT_URL}freight/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    del:{
        url: `${ROOT_URL}freight/del`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
