import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import { formatMessage } from 'umi-plugin-react/locale';
import defaultSettings from '@/config/default-settings';

const { menu, title } = defaultSettings;

interface RouterData {
  name: string;
  locale: string;
  authority?: string[];
  children?: any[];
  icon?: string;
  path: string;
}

export const matchParamsPath = (pathname: string, breadcrumbNameMap: object): RouterData => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
  return breadcrumbNameMap[pathKey];
};

const getPageTitle = (pathname: string, breadcrumbNameMap: object): string => {
  const currentRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currentRouterData) return title;

  const pageName = menu.disableLocal
    ? currentRouterData.name
    : formatMessage({
      id: currentRouterData.locale || currentRouterData.name,
      defaultMessage: currentRouterData.name,
    });

  return `${pageName} · ${title}`;
};

const getTitle = (pathname: string, breadcrumbNameMap: object): string => {
  const currentRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currentRouterData) return title;

  const pageName = menu.disableLocal
    ? currentRouterData.name
    : formatMessage({
      id: currentRouterData.locale || currentRouterData.name,
      defaultMessage: currentRouterData.name,
    });

  return `${pageName}`;
};

export const moGetTitle = memoizeOne(getTitle, isEqual);
export const moGetPageTitle = memoizeOne(getPageTitle, isEqual);
