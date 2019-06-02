import { Reducer } from 'redux';
import store from 'store';
import { stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { Effect } from '@/models/connect';
import { fetchCaptcha } from '@/services/global';
import { fetchLogin, fetchLogout, fetchResetPassword } from '@/services/user';
import { parseQuery } from '@/utils/path-tools';
import { setCookie, removeCookie } from '@/utils/cookie';
import { STORAGE_KEY_DEFAULT_CONFIG } from '@/config';

export type TLoginType = 'password' | 'sms';

export interface ILoginModel {
  namespace: 'login',
  state: {
    status: boolean;
    type: TLoginType;
  },
  effects: {
    // 用户登录
    fetchLogin: Effect;
    fetchLogout: Effect;
    fetchCaptcha: Effect;
    fetchResetPassword: Effect;
  },
  reducers: {
    changeStatus: Reducer<any>;
    changeLoginType: Reducer<any>;
  }
}

const { loginType } = STORAGE_KEY_DEFAULT_CONFIG;

const Login: ILoginModel = {
  namespace: 'login',
  state: {
    status: false,
    type: store.get(loginType, 'password')
  },
  effects: {
    *fetchLogin({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(fetchLogin, payload);
      // login success
      if (response && response.code === 200) {
        const { token } = response.data;
        if (token) {
          setCookie('', token);
        }
        const urlParams = new URL(window.location.href);
        const params = parseQuery();
        let { redirect } = params;
        // 处理登录重定向
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *fetchCaptcha({ payload }, { call, put }) {
      const response = yield call(fetchCaptcha, payload);

    },
    *fetchLogout({ payload }, { call, put }) {
      // 发送退出登录请求
      yield call(fetchLogout, payload);

      yield put({
        type: 'changeStatus',
        payload: {
          status: false
        },
      });

      removeCookie();

      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
    *fetchResetPassword({ payload }, { call, put }) {
      const response = yield call(fetchResetPassword, payload);

    }
  },
  reducers: {
    changeStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status
      };
    },
    changeLoginType(state, { payload }) {
      return {
        ...state,
        type: payload
      };
    }
  }
};

export default Login;
