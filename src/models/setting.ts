import { Reducer } from 'redux';
import DefaultSettings, { IDefaultSettings } from '@/config/default-settings';

export { IDefaultSettings as ISettingModelState };

export interface ISettingModel {
  name: 'setting',
  state: IDefaultSettings;
  reducers: {
    getSetting: Reducer<IDefaultSettings>;
  }
}

const SettingModel: ISettingModel = {
  name: 'setting',
  state: DefaultSettings,
  reducers: {
    getSetting(state) {
      const setting: any = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      return {
        ...state,
        ...setting,
      };
    },
  }
};

export default SettingModel;
