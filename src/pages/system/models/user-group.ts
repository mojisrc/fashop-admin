import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchAll, fetchList, fetchCreate, fetchRemove, fetchUpdate } from '@/services/group';
import { ITableData } from '@jiumao/rc-table';
import { formatTime } from '@/utils/utils';

export interface IGroup {
  id?: string | number;
  name?: string;
  displayName?: string;
  userNumber?: number;
  remark?: string;
  createTime?: string;
}

export interface IGroupTableData extends ITableData<IGroup> {}

export interface IUserGroupModelState {
  list: IGroup[];
  tableData: IGroupTableData;
}

export interface IUserGroupModel {
  namespace: 'userGroup';
  state: IUserGroupModelState;
  effects: {
    fetchAll: Effect;
    fetchList: Effect;
    fetchCreate: Effect;
    fetchRemove: Effect;
    fetchUpdate: Effect;
  };
  reducers: {
    saveList: Reducer<any>;
    saveTableData: Reducer<any>;
  };
}

const UserGroupModel: IUserGroupModel = {
  namespace: 'userGroup',
  state: {
    tableData: {
      list: [],
    },
    list: [],
  },
  effects: {
    *fetchAll({ payload }, { call, put }) {
      const response = yield call(fetchAll, payload);
      if (response && response.code === 200) {
        const list = response.data.list;

        const groups = list.map(item => ({
          id: item.id,
          name: item.name,
          displayName: item.displayName,
        }));

        yield put({
          type: 'saveList',
          payload: groups,
        });
      }
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.code === 200) {
        const data = response.data || {};
        const { list = [], total = 0 } = data;

        const groups = list.map(item => {
          return {
            ...item,
            createTime: formatTime(item.createTime),
          };
        });

        yield put({
          type: 'saveTableData',
          payload: {
            list: groups,
            pagination: {
              total,
              current: payload.page,
              pageSize: payload.limit,
            },
          },
        });
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
    },
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveTableData(state, { payload }) {
      return {
        ...state,
        tableData: payload,
      };
    },
  },
};

export default UserGroupModel;
