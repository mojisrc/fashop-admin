import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button } from 'antd';
import { ConnectProps, ConnectState } from '@/models/connect';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import FolderTree from './components/folder-tree';
import { IFolder } from './models/images';

interface IProps extends Required<ConnectProps> {
  folders: IFolder[];
  loading: boolean;
}

const ShopImages: React.FC<IProps> = props => {
  const { dispatch, folders, loading } = props;

  React.useEffect(() => {
    dispatch({
      type: 'images/fetchFolderList',
    });
  }, []);

  return (
    <div>
      <PageHeaderWrapper
        title="图片空间"
        extra={[
          <Button key="1" type="primary">
            创建根目录
          </Button>,
        ]}
      />

      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false} title="文件夹">
            <FolderTree folders={folders} />
          </Card>
        </Col>
        <Col span={18}>
          <Card bordered={false} title="主区域"></Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ images, loading }: ConnectState) => ({
  folders: images.folders,
  loading: loading.effects['images/fetchFolderList'],
}))(ShopImages);
