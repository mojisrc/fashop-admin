import React from 'react';
import DrawerWrapper from '@/components/drawer-wrapper';
import DescriptionList from '@/components/description-list';
import { IClient } from '../models/client';
import './client-detail.less';

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  clientInfo?: IClient;
}

const prefixCls = 'fa-client-detail';
const Description = DescriptionList.Description;

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
          <DescriptionList size="large" col={2} style={{ marginBottom: 32 }}>
            <Description term="昵称">{clientInfo.nickname}</Description>
            <Description term="手机号">{clientInfo.phone || '--'}</Description>
            <Description term="性别">{clientInfo.phone || '--'}</Description>
            <Description term="客户来源">{clientInfo.phone || '--'}</Description>
            <Description term="注册时间">{clientInfo.createTime}</Description>
          </DescriptionList>
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
