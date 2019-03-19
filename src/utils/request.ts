import Axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AXIOS_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

NProgress.configure({
  showSpinner: false
});

// 请求成功
function requestSuccess(config) {
  NProgress.start();
  const cookie = getCookie();
  if (cookie) {
    config.headers['Token'] = cookie;
  }
  return config;
}

// 请求失败
function requestFail(error) {
  NProgress.done();
  return Promise.reject(error);
}

// 响应成功
function responseSuccess(response) {
  NProgress.done();
  return response;
}

// 响应失败
function responseFail(error) {
  NProgress.done();
  return Promise.reject(error);
}

// 基本配置
Axios.defaults.timeout = AXIOS_DEFAULT_CONFIG.timeout;
Axios.defaults.baseURL = AXIOS_DEFAULT_CONFIG.baseURL;
Axios.defaults.withCredentials = AXIOS_DEFAULT_CONFIG.withCredentials;

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
      const { data } = response;
      // 处理返回数据格式
      return {
        data: data.result,
        code: data.code === 0 ? 200 : data.code,
        message: data.code === 0 ? 'success' : data.msg
      };
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
