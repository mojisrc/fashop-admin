import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { IClientTableData, IClient } from './models/client';
import ClientDetail from './components/client-detail';
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
  const [visible, setVisible] = React.useState<boolean>(false);
  const [currentClient, setCurrentClient] = React.useState<IClient>({});

  React.useEffect(() => {
    getList(queryData);
  }, []);

  const getList = data => {
    dispatch({
      type: 'client/fetchList',
      payload: data,
    });
  };

  const handleDetail = data => {
    setCurrentClient(data);
    setVisible(true);
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
      render: (text, record) => {
        return (
          <Button
            size="small"
            type="link"
            onClick={() => {
              handleDetail(record);
            }}
          >
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
      <PageHeaderWrapper title="客户列表" />

      <Card bordered={false}>{table}</Card>

      <ClientDetail
        visible={visible}
        clientInfo={currentClient}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default connect(({ client }: ConnectState) => ({
  tableData: client.tableData,
}))(ClientList);
