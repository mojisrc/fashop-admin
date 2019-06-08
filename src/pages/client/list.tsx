import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { IClientTableData } from './models/client';
import { Button, Card } from 'antd';

interface IProps extends Required<ConnectProps> {
  tableData: IClientTableData;
}

interface IQueryData {
  page: number;
  rows: number;
}

const ClientList: React.FC<IProps> = props => {
  const { dispatch, tableData } = props;
  const [queryData, setQueryData] = React.useState<IQueryData>({
    page: 1,
    rows: 10,
  });

  React.useEffect(() => {
    getList(queryData);
  }, []);

  const getList = data => {
    dispatch({
      type: 'client/fetchList',
      payload: data,
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: text => {
        return <img src={text} height={20} alt="avatar" />;
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      render: text => {
        return text || '--';
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: text => {
        return text || '--';
      },
    },
    {
      title: '累计消费',
      dataIndex: 'costTotal',
    },
    {
      title: '最后消费',
      dataIndex: 'lastCostTime',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: () => {
        return (
          <Button size="small" type="link">
            详情
          </Button>
        );
      },
    },
  ];

  const table = React.useMemo(() => {
    return <StandardTable data={tableData} columns={columns} />;
  }, [props.tableData]);

  return (
    <div>
      <PageHeaderWrapper title="客户列表"></PageHeaderWrapper>

      <Card bordered={false}>{table}</Card>
    </div>
  );
};

export default connect(({ client }: ConnectState) => ({
  tableData: client.tableData,
}))(ClientList);
