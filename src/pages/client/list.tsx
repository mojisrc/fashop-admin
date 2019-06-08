import React from 'react';
import { Form, Select, Input } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { ConnectProps, ConnectState } from '@/models/connect';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import useQueryData from '@/hooks/use-query-data';
import { IClientTableData, IClient } from './models/client';
import ClientDetail from './components/client-detail';
import { Button, Card } from 'antd';

interface IProps extends Required<ConnectProps>, FormComponentProps {
  loading: boolean;
  tableData: IClientTableData;
}

const Option = Select.Option;
const Search = Input.Search;

const ClientList: React.FC<IProps> = props => {
  const { dispatch, tableData, loading, form } = props;
  const { getFieldDecorator } = form;
  const [queryData, setQueryData] = useQueryData({ keywords_type: 'nickname' }, props.location);
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

  const handleQuery = () => {
    form.validateFields((error, values) => {
      const newQueryData = {
        ...queryData,
        ...values,
        page: 1,
      };
      console.log(newQueryData);
      setQueryData(newQueryData);
      getList(newQueryData);
    });
  };

  const handleKeywordsSelect = value => {
    const newQueryData = {
      ...queryData,
      keywords_type: value,
    };
    setQueryData(newQueryData);
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
      title: '购买次数',
      dataIndex: 'buyTimes',
    },
    {
      title: '累计消费(元)',
      dataIndex: 'costTotal',
    },
    {
      title: '客消费(元)',
      dataIndex: 'costAverage',
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
    return (
      <StandardTable
        data={tableData}
        columns={columns}
        loading={loading}
        onChange={handleTableChange}
      />
    );
  }, [props.tableData, props.loading]);

  const selectBefore = (
    <Select
      defaultValue={queryData.keywords_type}
      onSelect={handleKeywordsSelect}
      style={{ width: 80 }}
    >
      <Option value="nickname">昵称</Option>
      <Option value="phone">手机号</Option>
    </Select>
  );

  return (
    <div>
      <PageHeaderWrapper title="客户列表" />

      <Card bordered={false}>
        <div className="fa-table-tools">
          <Form layout="inline">
            <Form.Item label="">
              {getFieldDecorator('keywords', {
                initialValue: queryData.keywords,
                rules: [],
              })(
                <Search
                  addonBefore={selectBefore}
                  placeholder="请输入关键词"
                  onSearch={handleQuery}
                />,
              )}
            </Form.Item>
          </Form>
        </div>
        {table}
      </Card>

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

export default connect(({ client, loading }: ConnectState) => ({
  loading: loading.effects['client/fetchList'],
  tableData: client.tableData,
}))(Form.create()(ClientList));
