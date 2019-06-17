import React from 'react';
import { Descriptions } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IClient } from '../models/client';
import './client-detail.less';

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  clientInfo?: IClient;
}

const prefixCls = 'fa-client-detail';

const ClientDetail: React.FC<IProps> = props => {
  const { visible, onClose, clientInfo } = props;

  return (
    <DrawerWrapper
      visible={visible}
      title="客户详情"
      width={700}
      showFooter={false}
      onClose={onClose}
    >
      <div className={`${prefixCls}__info`}>
        <div className="avatar">
          <img width={90} src={clientInfo.avatar} alt="avatar" />
        </div>
        <div className="container">
          <Descriptions column={2} style={{ marginBottom: 32 }}>
            <Descriptions.Item label="昵称">{clientInfo.nickname}</Descriptions.Item>
            <Descriptions.Item label="手机号">{clientInfo.phone || '--'}</Descriptions.Item>
            <Descriptions.Item label="性别">{clientInfo.phone || '--'}</Descriptions.Item>
            <Descriptions.Item label="客户来源">{clientInfo.phone || '--'}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{clientInfo.createTime}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </DrawerWrapper>
  );
};

ClientDetail.defaultProps = {
  visible: false,
  clientInfo: {},
};

export default ClientDetail;
