import { Reducer } from 'redux';
import { fetchNotices } from '@/services/global';
import { Effect } from '@/models/connect';

export interface IGlobalModelState {
  notices: any[];
}

export interface IGlobalModel {
  name: 'global',
  state: IGlobalModelState,
  effects: {
    fetchQueryNotices: Effect;
  },
  reducers: {
    saveNotices: Reducer<any>;
  }
}

const GlobalModel: IGlobalModel = {
  name: 'global',
  state: {
    notices: []
  },
  effects: {
    *fetchQueryNotices(_, { call, put, select }) {
      const response = yield call(fetchNotices);
      if (response && response.code === 200) {
        const notices = response.data || [];
        yield put({
          type: 'saveNotices',
          payload: notices
        });
        const unreadCount = yield select(
          (state) => state.global.notices.filter((item) => !item.read).length
        );
        yield put({
          type: 'user/changeNotifyCount',
          payload: {
            totalCount: notices.length,
            unreadCount
          }
        });
      }
    },
  },
  reducers: {
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    }
  }
};

export default GlobalModel;
