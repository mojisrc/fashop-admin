import React from 'react';
import store from 'store';

interface IQueryData {
  page: number;
  rows: number;
  [key: string]: any;
}

/**
 * 表格筛选查询解决方案
 * 建议以当前路由为存储key，初次加载不存储，操作后才会存储
 *
 * @param storageKey 存储key
 * @param initQueryData 需要初始化的查询数据
 */
const useQueryData = (
  storageKey: string,
  initQueryData?: { [key: string]: any },
): [IQueryData, (nextValue?: IQueryData) => void] => {
  let storageData = {};
  if (storageKey) {
    storageData = store.get(storageKey);
  }

  const defaultQueryData = {
    page: 1,
    rows: 10,
    ...initQueryData,
    ...storageData,
  };

  const [queryData, setQueryData] = React.useState<IQueryData>(defaultQueryData);

  const storageQueryData = data => {
    storageKey && store.set(storageKey, data);
  };

  const toggle = React.useCallback(
    (nextValue: IQueryData) => {
      storageQueryData(nextValue);
      setQueryData(nextValue);
    },
    [setQueryData],
  );

  return [queryData, toggle];
};

export default useQueryData;
