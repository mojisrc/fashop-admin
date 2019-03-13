import { Effect } from 'dva';
import { Reducer } from 'redux';
import { fetchLogin } from '@/services/user.service';

export interface ILoginModelState {
  status?: string;
}

export interface ILoginModel {
  namespace: 'login',
  state: ILoginModelState,
  effects: {
    fetchLogin: Effect
  },
  reducers: {
    saveCurrentUser: Reducer<any>
  }
}

const UserModel: ILoginModel = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *fetchLogin(payload, { call, put }) {
      const response = yield call(fetchLogin, payload);
      if (response && response.code === 200) {

      }
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },
  }
};

export default UserModel;
