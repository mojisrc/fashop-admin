import React from 'react';
import { connect } from 'dva';
import { Button, Card } from 'antd';
import { ConnectProps, ConnectState } from '@/models/connect';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import useQueryData from '@/hooks/use-query-data';
import { IBrandTableData } from './models/brand';

interface IProps extends Required<ConnectProps> {
  loading: boolean;
  tableData: IBrandTableData;
}

const BrandPage: React.FC<IProps> = props => {
  const { tableData, loading, dispatch } = props;
  const [queryData, setQueryData] = useQueryData({}, props.location);

  React.useEffect(() => {
    getList(queryData);
  }, []);

  const getList = data => {
    dispatch({
      type: 'brand/fetchList',
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
      title: '品牌封面',
      dataIndex: 'logo',
      render: text => {
        return <img src={text} height={20} alt="logo" />;
      },
    },
    {
      title: '品牌名称',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
        title="品牌列表"
        extra={[
          <Button key="1" type="primary">
            添加品牌
          </Button>,
        ]}
      />

      <Card bordered={false}>{table}</Card>
    </div>
  );
};

export default connect(({ brand, loading }: ConnectState) => ({
  tableData: brand.tableData,
  loading: loading.effects['brand/fetchList'],
}))(BrandPage);
