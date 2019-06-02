import React from 'react';
import classNames from 'classnames';
import { Spin, Menu, Icon, Avatar } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from '@/components/header-dropdown';
import SelectLang from '@/components/select-lang';
import ScreenFull from '@/components/screen-full';
import { ICurrentUser } from '@/models/user';

interface IProps {
  prefixCls?: string;
  notices?: any[];
  onMenuClick?: (key: string) => void;
  currentUser?: ICurrentUser;
}

const GlobalHeaderRight: React.FC<IProps> = (props) => {
  const { prefixCls, onMenuClick, currentUser } = props;

  const handleMenuClick = ({ key }) => {
    onMenuClick && onMenuClick(key);
  };

  const menu = (
    <Menu
      className={`${prefixCls}__menu`}
      selectedKeys={[]}
      onClick={handleMenuClick}
    >
      <Menu.Item key="account-center">
        <Icon type="user" />
        <FormattedMessage id="menu.account.center" defaultMessage="account center" />
      </Menu.Item>
      <Menu.Item key="account-settings">
        <Icon type="setting" />
        <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`${prefixCls}__right`}>

      <ScreenFull className={`${prefixCls}__action`} />

      <SelectLang className={`${prefixCls}__action`} />

      {currentUser.name ? (
        <HeaderDropdown overlay={menu}>
            <span
              className={classNames({
                [`${prefixCls}__action`]: true,
                [`${prefixCls}__account`]: true
              })}
            >
              <Avatar
                size="small"
                src={currentUser.avatar}
                alt="avatar"
              />
              <span>{currentUser.name}</span>
            </span>
        </HeaderDropdown>
      ) : (
        <Spin
          size="small"
          style={{ marginLeft: 8, marginRight: 8 }}
        />
      )}
    </div>
  )
};

GlobalHeaderRight.defaultProps = {
  prefixCls: 'lotus-global-header',
  currentUser: {}
};

export default GlobalHeaderRight;
