import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const MemberApi ={
    del:{
        url: `${ROOT_URL}member/del`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    token:{
        url: `${ROOT_URL}member/token`,
        method: 'POST',
        showLoading: true,
        needLogin: false,
    },
    selfEdit:{
        url: `${ROOT_URL}member/selfEdit`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    add:{
        url: `${ROOT_URL}member/add`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    list:{
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    verifyCode:{
        url: `${ROOT_URL}member/verifyCode`,
        method: 'GET',
        showLoading: false,
        needLogin: false,
    },
    logout:{
        url: `${ROOT_URL}member/logout`,
        method: 'GET',
        showLoading: false,
        needLogin: false,
    },
    self:{
        url: `${ROOT_URL}member/self`,
        method: 'GET',
        showLoading: true,
        needLogin: false,
    },
    selfPassword:{
        url: `${ROOT_URL}member/selfPassword`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    login:{
        url: `${ROOT_URL}member/login`,
        method: 'POST',
        showLoading: true,
        needLogin: false,
    }
}
