import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const ShopApi = {
    info:{
        url: `${ROOT_URL}shop/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    setOrderExpires:{
        url: `${ROOT_URL}shop/setOrderExpires`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setBaseInfo:{
        url: `${ROOT_URL}shop/setBaseInfo`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setIndexInfo:{
        url: `${ROOT_URL}shop/setIndexInfo`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setGoodsCategoryStyle:{
        url: `${ROOT_URL}shop/setGoodsCategoryStyle`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setColorScheme:{
        url: `${ROOT_URL}shop/setColorScheme`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    setPortalTemplate:{
        url: `${ROOT_URL}shop/setPortalTemplate`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    }
}
