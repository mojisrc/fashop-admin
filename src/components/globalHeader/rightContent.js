import React, { PureComponent } from "react";
import { formatMessage } from "@/utils/locale";
import { FormattedMessage } from "umi";
import { Spin, Menu, Avatar, Tooltip } from "antd";
import HeaderDropdown from "../headerDropdown";
import styles from "./index.less";
import UserOutlined from "@ant-design/icons/UserOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined";

export default class GlobalHeaderRight extends PureComponent {
    render() {
        const {
            currentUser,
            onMenuClick,
            theme
        } = this.props;
        const menu = (
          <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
              <Menu.Item key="userCenter">
                  <UserOutlined />
                  <FormattedMessage id="menu.account.center" defaultMessage="account center" />
              </Menu.Item>
              <Menu.Item key="userinfo">
                  <SettingOutlined />
                  <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
              </Menu.Item>
              <Menu.Item key="triggerError">
                  <CloseCircleOutlined />
                  <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error" />
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="logout">
                  <LogoutOutlined />
                  <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
              </Menu.Item>
          </Menu>
        );
        let className = styles.right;
        if (theme === "dark") {
            className = `${styles.right}  ${styles.dark}`;
        }
        return (
          <div className={className}>

              <Tooltip title={formatMessage({ id: "component.globalHeader.help" })}>
                  <a
                    target="_blank"
                    href="https://www.domain.com"
                    rel="noopener noreferrer"
                    className={styles.action}
                  >
                      <QuestionCircleOutlined />
                  </a>
              </Tooltip>
              {currentUser.name ? (
                <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
                </HeaderDropdown>
              ) : (
                <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
              )}
          </div>
        );
    }
}
