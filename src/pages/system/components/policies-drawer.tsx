import React from 'react';
import { Transfer, Descriptions } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IPolicy } from '@/models/policy';
import { IUser } from '../models/system-user';
import { IGroup } from '../models/user-group';
import './policies-drawer.less';

interface IProps {
  prefixCls?: string;
  visible?: boolean;
  onClose?: () => void;
  // 用户信息
  user?: IUser;
  // 用户组信息
  group?: IGroup;
  // 所有权限策略
  policies?: IPolicy[];
  // 已有的权限策略
  defaultPolicies?: string[];
  type?: 'user' | 'group';
  onConfirm?: (values) => void;
}

const PoliciesDrawer: React.FC<IProps> = props => {
  const { prefixCls, user, type, group, visible, onClose } = props;
  const [title, setTitle] = React.useState<string>('');
  const [targetKeys, setTargetKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    const title = type === 'user' ? '用户赋权' : '用户组赋权';
    setTitle(title);
  }, [props.type]);

  const handleConfirm = () => {};

  const handleChange = targetKeys => {
    setTargetKeys(targetKeys);
  };

  const filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  };

  const renderItem = item => {
    const customLabel = (
      <span>
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel,
      value: item.title,
    };
  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={700}
      title={title}
    >
      <div className={prefixCls}>
        {type === 'user' && (
          <Descriptions title="用户信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
            <Descriptions.Item label="手机号">{user.mobile}</Descriptions.Item>
          </Descriptions>
        )}

        {type === 'group' && (
          <Descriptions title="用户组信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="用户组名">{group.name}</Descriptions.Item>
            <Descriptions.Item label="显示名称">{group.displayName}</Descriptions.Item>
          </Descriptions>
        )}

        <Transfer
          dataSource={[]}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={renderItem}
        />
      </div>
    </DrawerWrapper>
  );
};

PoliciesDrawer.defaultProps = {
  visible: false,
  prefixCls: 'lotus-policies-drawer',
  user: {},
  policies: [],
};

export default PoliciesDrawer;
