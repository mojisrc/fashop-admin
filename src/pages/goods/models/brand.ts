import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { ITableData } from '@/components/standard-table';
import { formatTime } from '@/utils/utils';
import { fetchList } from '@/services/brand';

export interface IBrand {
  id?: number;
  // 商品图片
  img?: string;
  // 商品名称
  title?: string;
  // 价格
  price?: string;
  // 库存
  stock?: number;
  shelfStatus?: 0 | 1;
  createTime?: string;
}

export interface IBrandTableData extends ITableData<IBrand> {}

export interface IBrandModelState {
  tableData: IBrandTableData;
}

export interface IBrandModel {
  namespace: 'brand';
  state: IBrandModelState;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    saveTableData: Reducer<any>;
  };
}

const BrandModel: IBrandModel = {
  namespace: 'brand',
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

        const clients: IBrand[] = list.map(item => ({
          id: item.id,
          img: item.img,
          title: item.title,
          price: item.price,
          stock: item.stock,
          shelfStatus: item.is_on_sale,
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

export default BrandModel;
