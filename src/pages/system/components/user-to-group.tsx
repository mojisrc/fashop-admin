import React from 'react';
import { Divider, Transfer, Alert } from 'antd';
import { TransferItem } from 'antd/es/transfer';
import DrawerWrapper from '@/components/drawer-wrapper';
import DescriptionList from '@/components/description-list';
import { IUser } from '../models/system-user';
import { IGroup } from '../models/user-group';
import './user-to-group.less';

interface IProps {
  prefixCls?: string;
  visible?: boolean;
  onClose?: () => void;
  user?: IUser;
  groups?: IGroup[];
  onConfirm?: (values) => void;
}

const Description = DescriptionList.Description;

const UserToGroup: React.FC<IProps> = (props) => {
  const { prefixCls, visible, user, groups, onClose, onConfirm } = props;
  const [targetKeys, setTargetKeys] = React.useState<string[]>([]);
  const [userGroups, setUserGroups] = React.useState<TransferItem[]>([]);

  React.useEffect(() => {
    const list: any[] = groups.map(item => ({
      key: item.id,
      title: item.name,
      description: item.displayName
    }));
    setUserGroups(list);
  }, [props.groups]);

  React.useEffect(() => {
    if (!visible) {
      setTargetKeys([]);
    }
  }, [props.visible]);

  const handleConfirm = () => {
    if (!targetKeys.length) return;
    onConfirm && onConfirm(targetKeys);
  };

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  const filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1
  };

  const renderItem = (item) => {
    const customLabel = (
      <span>
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel,
      value: item.title
    };
  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={700}
      title="添加到用户组"
    >
      <Alert
        message="用户添加到用户组，将拥有该用户组所有权限"
        type="warning"
        closable
      />
      <div className={prefixCls}>
        <DescriptionList
          size="large"
          title="用户信息"
          style={{ marginBottom: 32 }}
        >
          <Description term="用户名">
            {user.username}
          </Description>
          <Description term="邮箱">
            {user.email}
          </Description>
          <Description term="手机号">
            {user.mobile}
          </Description>
        </DescriptionList>

        <Divider />

        <Transfer
          dataSource={userGroups}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={renderItem}
        />
      </div>
    </DrawerWrapper>
  )
};

UserToGroup.defaultProps = {
  prefixCls: 'lotus-user-to-group',
  user: {},
  groups: []
};

export default UserToGroup;
