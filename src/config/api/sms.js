import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const SmsApi = {
    provider:{
        edit:{
            url: `${ROOT_URL}Smsprovider/edit`,
            method: 'POST',
            showLoading: false,
            needLogin: true,
        }
    },
    scene:{
        edit:{
            url: `${ROOT_URL}Smsscene/edit`,
            method: 'POST',
            showLoading: false,
            needLogin: true,
        },
        info:{
            url: `${ROOT_URL}Smsscene/info`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        list:{
            url: `${ROOT_URL}Smsscene/list`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        add:{
            url: `${ROOT_URL}goods/add`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        }
    }
}
