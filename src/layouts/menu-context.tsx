import { createContext } from 'react';
import { Location } from 'history';
import { IMenu } from '@/components/sidebar-menu';

export type IProviderStore = {
  location?: Location;
  breadcrumbNameMap: { [path: string]: IMenu };
};

export default createContext({} as IProviderStore);
