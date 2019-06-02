import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import {
  fetchList,
  fetchCreate,
  fetchRemove,
  fetchUpdate
} from '@/services/user';
import { IPolicyData } from '@jiumao/policy';
import { ITableData } from '@/components/standard-table';
import { formatTime } from '@/utils/utils';

export interface IUser {
  id?: string | number;
  username?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  remark?: string;
}

export interface IUserTableData extends ITableData<IUser> {}

export interface ISystemUserModelState {
  list: IUser[],
  tableData: IUserTableData
  policies: IPolicyData[];
}

export interface ISystemUserModel {
  namespace: 'systemUser';
  state: ISystemUserModelState;
  effects: {
    // 获取用户列表
    fetchList: Effect;
    fetchCreate: Effect;
    fetchRemove: Effect;
    fetchUpdate: Effect;
  },
  reducers: {
    saveTableData: Reducer<any>;
    savePolicies: Reducer<any>;
  }
}

const SystemUserModel: ISystemUserModel = {
  namespace: 'systemUser',
  state: {
    list: [],
    tableData: {
      list: []
    },
    policies: []
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.code === 200) {
        const data = response.data || {};
        const { list = [], total = 0 } = data;

        const users = list.map(item => {
          return {
            ...item,
            createTime: formatTime(item.createTime)
          }
        });

        yield put({
          type: 'saveTableData',
          payload: {
            list: users,
            pagination: {
              total,
              current: payload.page,
              pageSize: payload.limit
            }
          }
        })
      }
    },
    *fetchCreate({ payload, callback }, { call }) {
      const response = yield call(fetchCreate, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    },
    *fetchRemove({ payload, callback }, { call }) {
      const response = yield call(fetchRemove, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    },
    *fetchUpdate({ payload, callback }, { call }) {
      const response = yield call(fetchUpdate, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    }
  },
  reducers: {
    saveTableData(state, { payload }) {
      return {
        ...state,
        tableData: payload
      };
    },
    savePolicies(state, { payload }) {
      return {
        ...state,
        policies: payload
      };
    }
  }
};

export default SystemUserModel;
