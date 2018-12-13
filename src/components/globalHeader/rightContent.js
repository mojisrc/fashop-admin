import React, { PureComponent } from "react";
import { FormattedMessage, formatMessage } from "umi/locale";
import { Spin,  Menu, Icon, Avatar, Tooltip } from "antd";
import HeaderDropdown from "../headerDropdown";
import styles from "./index.less";

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
                    <Icon type="user" />
                    <FormattedMessage id="menu.account.center" defaultMessage="account center" />
                </Menu.Item>
                <Menu.Item key="userinfo">
                    <Icon type="setting" />
                    <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
                </Menu.Item>
                <Menu.Item key="triggerError">
                    <Icon type="close-circle" />
                    <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error" />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
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
                        href="https://www.fashop.cn"
                        rel="noopener noreferrer"
                        className={styles.action}
                    >
                        <Icon type="question-circle-o" />
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
