import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const AdsApi = {
    info:{
        url: `${ROOT_URL}ads/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    setAdsInfo:{
        url: `${ROOT_URL}ads/save`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
