import request from '@/utils/request';

import Fetch from "@/utils/fetch";
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}


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
  }
}
