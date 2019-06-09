import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchFolderList, fetchFolderCreate, fetchFolderRemove } from '@/services/images';

export interface IImages {
  id?: number;
  name?: string;
}

// 文件夹
export interface IFolder {
  id: number;
  pId: number;
  title: string;
}

export interface IImagesModelState {
  folders: IFolder[];
}

export interface IImagesModel {
  namespace: 'images';
  state: IImagesModelState;
  effects: {
    fetchFolderList: Effect;
  };
  reducers: {
    saveFolders: Reducer<any>;
  };
}

const ImagesModel: IImagesModel = {
  namespace: 'images',
  state: {
    folders: [],
  },
  effects: {
    *fetchFolderList({ payload }, { call, put }) {
      const response = yield call(fetchFolderList, payload);

      if (response && response.code === 200) {
        const list = response.data.list || [];

        const folders = list.map(item => ({
          id: item.id,
          pId: item.pid,
          title: item.title,
        }));

        console.log(folders);

        yield put({
          type: 'saveFolders',
          payload: folders,
        });
      }
    },
  },
  reducers: {
    saveFolders(state, { payload }) {
      return {
        ...state,
        folders: payload,
      };
    },
  },
};

export default ImagesModel;
