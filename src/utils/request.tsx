import Axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AJAX_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

Axios.defaults.timeout = AJAX_DEFAULT_CONFIG.timeout;
Axios.defaults.baseURL = AJAX_DEFAULT_CONFIG.baseURL;
Axios.defaults.withCredentials = AJAX_DEFAULT_CONFIG.withCredentials;

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
  return response;
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
      const { data, code, message } = response.data;

      return {
        data: data || {},
        code,
        message
      };
    })
    .catch((error) => {
      if (!error.response) {
        return console.log('Error', error.message);
      }

      const code = error.response.code;

      if (code === 401) {
        router.push('/user/login');
      }

      // 开发调试
      console.log(
        `【${config.method} ${config.url}】请求失败，响应数据：%o`,
        error.response
      );

      return { code, message: '' };
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
      params: {...params, _t: (new Date()).getTime()},
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
