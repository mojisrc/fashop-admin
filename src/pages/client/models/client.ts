import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { ITableData } from '@jiumao/rc-table';
import { formatTime } from '@/utils/utils';
import { fetchList } from '@/services/client';

export interface IClient {
  id?: number;
  name?: string;
  phone?: string;
  // 用户名
  username?: string;
  // 用户昵称
  nickname?: string;
  // 用户头像
  avatar?: string;
  // 累计消费
  costTotal?: string;
  // 平均消费 - 客单价
  costAverage?: string;
  // 购买次数
  buyTimes?: number;
  // 最后消费时间
  lastCostTime?: string;
  // 注册时间
  createTime?: string;
}

export interface IClientTableData extends ITableData<IClient> {}

export interface IClientModelState {
  tableData: IClientTableData;
}

export interface IClientModel {
  namespace: 'client';
  state: IClientModelState;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    saveTableData: Reducer<any>;
  };
}

const ClientModel: IClientModel = {
  namespace: 'client',
  state: {
    tableData: {
      list: [],
    },
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);

      if (response && response.code === 200) {
        const { page = 1, rows = 10 } = payload;
        const list = response.data.list || [];
        const total = response.data.total_number || 0;

        const clients: IClient[] = list.map(item => ({
          id: item.id,
          name: item.name,
          nickname: item.nickname,
          phone: item.phone,
          avatar: item.avatar,
          costTotal: item.cost_total,
          costAverage: item.cost_average,
          buyTimes: item.buy_times,
          lastCostTime: item.last_cost_time ? formatTime(item.create_time * 1000) : '--',
          createTime: formatTime(item.create_time * 1000),
        }));

        yield put({
          type: 'saveTableData',
          payload: {
            list: clients,
            pagination: {
              total,
              current: page,
              pageSize: rows,
            },
          },
        });
      }
    },
  },
  reducers: {
    saveTableData(state, { payload }) {
      return {
        ...state,
        tableData: payload,
      };
    },
  },
};

export default ClientModel;
