import React, { PureComponent, Suspense } from "react";
import { Layout } from "antd";
import classNames from "classnames";
import { Link } from "umi";
import styles from "./index.less";
import PageLoading from "../pageLoading";
import { getDefaultCollapsedSubMenus } from "./siderMenuUtils";
import defaultSettings from "@/defaultSettings";

const BaseMenu = React.lazy(() => import("./baseMenu"));
const LeftFooter = React.lazy(() => import("./leftFooter"));
const { Sider } = Layout;
let firstMount = true;
export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        };
    }

    componentDidMount() {
        firstMount = false;
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname, flatMenuKeysLen } = state;
        if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
            return {
                pathname: props.location.pathname,
                flatMenuKeysLen: props.flatMenuKeys.length,
                openKeys: getDefaultCollapsedSubMenus(props)
            };
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
        });
    };

    render() {
        const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys };

        const siderClassName = classNames(styles.sider, {
            [styles.fixSiderBar]: fixSiderbar,
            [styles.light]: theme === "light"
        });
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={collapse => {
                    if (firstMount || !isMobile) {
                        onCollapse(collapse);
                    }
                }}
                width={defaultSettings.siderMenuWidth}
                theme={theme}
                className={siderClassName}
            >
                <div className={styles.logo} id="logo">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            style={collapsed ? { width: 65, height: 23 } : { width: defaultSettings.siderMenuLogoWidth, height: "auto" }}
                        />
                    </Link>
                </div>
                <Suspense fallback={<PageLoading />}>
                    <BaseMenu
                        {...this.props}
                        mode="inline"
                        handleOpenChange={this.handleOpenChange}
                        onOpenChange={this.handleOpenChange}
                        style={{ padding: "0 0 16px 0", width: "100%" }}
                        {...defaultProps}
                    />
                    {/*底部退出*/}
                    <LeftFooter />
                </Suspense>
            </Sider>
        );
    }
}
