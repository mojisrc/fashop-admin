import { RouterTypes } from 'umi';
import { AnyAction } from 'redux';
import { IRoute } from 'umi-types';
import { EffectsCommandMap } from 'dva';
import { match } from 'react-router-dom';
import { IMenuModelState } from '@/models/menu';
import { IGlobalModelState } from '@/models/global';
import { ISettingModelState } from '@/models/setting';
import { IUserModelState } from '@/models/user';
import { IActionModelState } from '@/models/action';
import { IPolicyModelState } from '@/models/policy';
import { IUserGroupModelState } from '@/pages/system/models/user-group';
import { ISystemUserModelState } from '@/pages/system/models/system-user';
import { IClientModelState } from '@/pages/client/models/client';
import { IOrderModelState } from '@/pages/order/models/order';
import { IGoodsModelState } from '@/pages/goods/models/goods';
import { IBrandModelState } from '@/pages/goods/models/brand';
import { IImagesModelState } from '@/pages/shop/models/images';

export interface ConnectState {
  loading: Loading;
  menu: IMenuModelState;
  global: IGlobalModelState;
  setting: ISettingModelState;
  user: IUserModelState;
  systemUser: ISystemUserModelState;
  userGroup: IUserGroupModelState;
  client: IClientModelState;
  order: IOrderModelState;
  goods: IGoodsModelState;
  action: IActionModelState;
  policy: IPolicyModelState;
  brand: IBrandModelState;
  images: IImagesModelState;
}

export {
  IMenuModelState,
  IGlobalModelState,
  ISettingModelState,
  IUserGroupModelState,
  IActionModelState,
  IPolicyModelState,
  IClientModelState,
  IOrderModelState,
  IUserModelState,
  IBrandModelState,
  IGoodsModelState,
  IImagesModelState,
};

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    menu?: boolean;
  };
}

export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<IRoute>> {
  dispatch?: Dispatch;
  match?: match<P>;
}

export default ConnectState;
