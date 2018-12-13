import React, { Fragment } from "react";
import { formatMessage } from "umi/locale";
import Link from "umi/link";
import { Icon } from "antd";
import GlobalFooter from "@/components/globalFooter";
import styles from "./userLayout.less";
import logo from "@/assets/logo.svg";

const links = [
    {
        key: "help",
        title: formatMessage({ id: "layout.user.link.help" }),
        href: ""
    },
    {
        key: "privacy",
        title: formatMessage({ id: "layout.user.link.privacy" }),
        href: ""
    },
    {
        key: "terms",
        title: formatMessage({ id: "layout.user.link.terms" }),
        href: ""
    }
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> FaShop 商城系统 - Power By FaShop ( www.fashop.cn )
    </Fragment>
);

class UserLayout extends React.PureComponent {
    // @TODO title
    // getPageTitle() {
    //   const { routerData, location } = this.props;
    //   const { pathname } = location;
    //   let title = 'FaShop 商城系统 - Power By FaShop ( www.fashop.cn )';
    //   if (routerData[pathname] && routerData[pathname].name) {
    //     title = `${routerData[pathname].name} - FaShop 商城系统 - Power By FaShop ( www.fashop.cn )`;
    //   }
    //   return title;
    // }

    render() {
        const { children } = this.props;
        return (
            // @TODO <DocumentTitle title={this.getPageTitle()}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>Ant Design</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>FaShop 商城系统 - Power By FaShop ( www.fashop.cn )</div>
                    </div>
                    {children}
                </div>
                <GlobalFooter links={links} copyright={copyright} />
            </div>
        );
    }
}

export default UserLayout;
