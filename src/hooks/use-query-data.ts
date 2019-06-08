import React from 'react';
import store from 'store';
import { Location } from 'history';

interface IQueryData {
  page: number;
  rows: number;
  [key: string]: any;
}

const useQueryData = (
  initQueryData: { [key: string]: any },
  location: Location,
): [IQueryData, (nextValue?: IQueryData) => void] => {
  const { pathname } = location;
  const defaultQueryData = store.get(pathname);
  const [queryData, setQueryData] = React.useState<IQueryData>(
    defaultQueryData
      ? defaultQueryData
      : {
          page: 1,
          rows: 10,
          ...initQueryData,
        },
  );

  React.useEffect(() => {
    if (pathname) {
      defaultQueryData && setQueryData(defaultQueryData);
    }
  }, [location.pathname]);

  const toggle = React.useCallback(
    (nextValue: IQueryData) => {
      pathname && store.set(pathname, nextValue);
      setQueryData(nextValue);
    },
    [setQueryData],
  );

  return [queryData, toggle];
};

export default useQueryData;
