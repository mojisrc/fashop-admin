import React from 'react';
import { connect } from 'dva';
import { Card, Switch, Button } from 'antd';
import { ConnectProps, ConnectState } from '@/models/connect';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import useQueryData from '@/hooks/use-query-data';
import { IGoodsTableData } from './models/goods';

interface IProps extends Required<ConnectProps> {
  loading: boolean;
  tableData: IGoodsTableData;
}

const GoodsList: React.FC<IProps> = props => {
  const { tableData, loading, dispatch } = props;
  const [queryData, setQueryData] = useQueryData({}, props.location);

  React.useEffect(() => {
    getList(queryData);
  }, []);

  const getList = data => {
    dispatch({
      type: 'goods/fetchList',
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
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '商品图',
      dataIndex: 'img',
      render: text => {
        return <img src={text} height={20} alt="avatar" />;
      },
    },
    {
      title: '商品标题',
      dataIndex: 'title',
    },
    {
      title: '价格(元)',
      dataIndex: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '是否上架',
      dataIndex: 'shelfStatus',
      render: text => <Switch checked={text === 1} />,
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: text => (
        <div className="fa-table-actions">
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </div>
      ),
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
        title="商品列表"
        extra={[
          <Button key="1" type="primary">
            添加商品
          </Button>,
        ]}
      />

      <Card bordered={false}>{table}</Card>
    </div>
  );
};

export default connect(({ loading, goods }: ConnectState) => ({
  loading: loading.effects['goods/fetchList'],
  tableData: goods.tableData,
}))(GoodsList);
