import Axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AXIOS_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

Axios.defaults.timeout = AXIOS_DEFAULT_CONFIG.timeout;
Axios.defaults.baseURL = AXIOS_DEFAULT_CONFIG.baseURL;
Axios.defaults.withCredentials = AXIOS_DEFAULT_CONFIG.withCredentials;

function requestSuccess(config) {
  // 请求开始，开启进度条
  NProgress.start();
  const cookie = getCookie();
  if (cookie) {
    config.headers['Token'] = cookie;
  }
  return config;
}

function requestFail(error) {
  return Promise.reject(error);
}

/**
 * 统一的接口的返回数据格式
 * {
 *   data: any
 *   code: number,
 *   message: string,
 * }
 * @param response
 */
function responseSuccess(response) {
  // 请求结束，关闭进度条
  NProgress.done();
  const { data, status, message } = response.data;

  response.data = {
    data,
    code: status,
    message
  };

  return response.data;
}

function responseFail(error) {
  // 请求失败，也应关闭进度条
  NProgress.done();
  return Promise.reject(error);
}

// 添加拦截器
Axios.interceptors.request.use(requestSuccess, requestFail);
Axios.interceptors.response.use(responseSuccess, responseFail);

/**
 *
 * @param config
 */
export const request = (config: AxiosRequestConfig) => {
  return Axios(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (!error.response) {
        return console.log('Error', error.message);
      }

      const status = error.response.status;

      if (status === 401) {
        router.push('/user/login');
      }

      // 开发调试
      console.log(
        `【${config.method} ${config.url}】请求失败，响应数据：%o`,
        error.response
      );

      return { code: status, message: '' };
    });
};

export const Get = (
  url: string,
  params?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      params: params,
      method: 'get'
    })
  );
};

export const Post = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'post'
    })
  );
};

export const Put = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'put'
    })
  );
};

export const Delete = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'delete'
    })
  );
};
