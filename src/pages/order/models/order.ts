import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { ITableData } from '@/components/standard-table';
import { formatTime } from '@/utils/utils';
import { fetchList } from '@/services/order';

export interface IOrder {
  id?: number;
  // 订单号
  sn?: string;
  // 订单状态
  state?: number;
  // 商品总额
  totalMoney?: string;
  createTime?: string;
}

export interface IOrderTableData extends ITableData<IOrder> {}

export interface IOrderModelState {
  tableData: IOrderTableData;
}

export interface IOrderModel {
  namespace: 'order';
  state: IOrderModelState;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    saveTableData: Reducer<any>;
  };
}

const OrderModel: IOrderModel = {
  namespace: 'order',
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

        const clients: IOrder[] = list.map(item => ({
          id: item.id,
          sn: item.sn,
          state: item.state,
          totalMoney: item.amount,
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

export default OrderModel;
