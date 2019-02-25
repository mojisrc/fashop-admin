import { fetchLogin, fetchCurrent } from '@/services/user.service';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    // 用户登录
    *fetchLogin(payload, { call, put }) {
      const response = yield call(fetchLogin, payload);
      if (response && response.code === 200) {

      }
    },
    // 获取当前登录用户信息
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fetchCurrent);
      if (response && response.code === 200) {

      }
    },
  },


  reducers: {

  }
}
