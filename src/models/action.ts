import { Reducer } from 'redux';
import { message } from 'antd';
import { Effect } from '@/models/connect';
import {
  fetchList,
  fetchRemove,
  fetchCreate,
  fetchUpdate,
  fetchModuleList
} from '@/services/action';

export interface IAction {
  id?: string | number;
  name?: string;
  displayName?: string;
  moduleId?: string;
  module?: IModule;
  type?: number;
  remark?: string;
}

export interface IModule {
  id?: string | number;
  name?: string;
}

export interface IActionModelState {
  list: IAction[];
  modules: IModule[];
}

export interface IActionModel {
  namespace: 'action',
  state: IActionModelState,
  effects: {
    fetchList: Effect;
    fetchCreate: Effect;
    fetchRemove: Effect;
    fetchUpdate: Effect;
    fetchModules: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
    saveModules: Reducer<any>;
  }
}

const ActionModel: IActionModel = {
  namespace: 'action',
  state: {
    list: [],
    modules: []
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.code === 200) {
        const list = response.data;

        yield put({
          type: 'saveList',
          payload: list
        })
      }
    },
    *fetchCreate({ payload, callback }, { call }) {
      const response = yield call(fetchCreate, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    },
    *fetchUpdate({ payload, callback }, { call }) {
      const response = yield call(fetchUpdate, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    },
    *fetchRemove({ payload }, { call }) {
      const response = yield call(fetchRemove, payload);
      if (response && response.code === 200) {
        message.success('删除成功！');
      }
    },
    *fetchModules(_, { call, put }) {
      const response = yield call(fetchModuleList);
      if (response && response.code === 200) {
        const data = response.data;

        yield put({
          type: 'saveModules',
          payload: data
        })
      }
    }
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
    saveModules(state, { payload }) {
      return {
        ...state,
        modules: payload
      };
    }
  }
};

export default ActionModel;
