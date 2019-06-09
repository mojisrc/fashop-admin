import React from 'react';
import { connect } from 'dva';
import { Button, Card, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import { ConnectProps, ConnectState } from '@/models/connect';
import StandardTable from '@/components/standard-table';
import useQueryData from '@/hooks/use-query-data';
import { IOrderTableData } from './models/order';
import { orderStatusList } from './config';

interface IProps extends Required<ConnectProps> {
  loading: boolean;
  tableData: IOrderTableData;
}

const TabPane = Tabs.TabPane;

const OrderList: React.FC<IProps> = props => {
  const { tableData, loading, dispatch } = props;
  const [queryData, setQueryData] = useQueryData({}, props.location);

  React.useEffect(() => {
    getList(queryData);
  }, []);

  const getList = data => {
    dispatch({
      type: 'order/fetchList',
      payload: data,
    });
  };

  const handleTableChange = pagination => {
    const { current, pageSize } = pagination;

    const newQueryData = {
      ...queryData,
      page: current,
      rows: pageSize,
    };
    setQueryData(newQueryData);
    getList(newQueryData);
  };

  const columns = [
    {
      title: '订单号',
      dataIndex: 'sn',
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
    },
    {
      title: '订单状态',
      dataIndex: 'state',
    },
    {
      title: '累计消费(元)',
      dataIndex: 'costTotal',
    },
    {
      title: '商品总额(元)',
      dataIndex: 'totalMoney',
    },
  ];

  const table = React.useMemo(() => {
    return (
      <StandardTable
        data={tableData}
        columns={columns}
        loading={loading}
        onChange={handleTableChange}
      />
    );
  }, [props.tableData, props.loading]);

  return (
    <div>
      <PageHeaderWrapper
        title="订单列表"
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="全部" key="all" />
            {orderStatusList &&
              orderStatusList.map(item => <TabPane tab={item.text} key={item.value} />)}
          </Tabs>
        }
      />

      <Card bordered={false}>{table}</Card>
    </div>
  );
};

export default connect(({ loading, order }: ConnectState) => ({
  loading: loading.effects['client/fetchList'],
  tableData: order.tableData,
}))(OrderList);
