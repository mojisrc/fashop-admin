import React, { useState } from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
import {
  PaginationConfig,
  TableProps,
  SorterResult,
  TableCurrentDataSource
} from 'antd/es/table';
import './standard-table.less';

export interface ITableData<T> {
  list: T[];
  pagination?: PaginationConfig
}

interface IProps<T> extends TableProps<T> {
  onSelectRow?: (rows: T[]) => void;
  data: ITableData<T>;
  selectedRows?: T[];
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra?: TableCurrentDataSource<T>,
  ) => void;
}

const StandardTable: React.FC<IProps<any>> = (props) => {
  const {
    className,
    prefixCls,
    style,
    rowKey,
    data,
    onChange,
    ...restProps
  } = props;
  const { list = [], pagination } = data;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);

  const handleTableChange = (
    pagination,
    filters,
    sorter
  ) => {
    onChange && onChange(pagination, filters, sorter);
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    ...pagination,
  };

  return (
    <Table
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      rowKey={rowKey}
      dataSource={list}
      pagination={paginationProps}
      onChange={handleTableChange}
      {...restProps}
    />
  )
};

StandardTable.defaultProps = {
  rowKey: 'id'
};

export default StandardTable;
