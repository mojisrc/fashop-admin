import React, { Fragment } from "react";
import { formatMessage } from "umi/locale";
import Link from "umi/link";
import { Icon } from "antd";
import GlobalFooter from "@/components/globalFooter";
import styles from "./userLayout.less";
import logo from "@/assets/images/loginLogo.png";

const links = [
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> FaShop 商城系统 - Power By FaShop ( www.fashop.cn )
    </Fragment>
);

class UserLayout extends React.PureComponent {

    render() {
        const { children } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                            </Link>
                        </div>
                    </div>
                    {children}
                </div>
                <GlobalFooter links={links} copyright={copyright} />
            </div>
        );
    }
}

export default UserLayout;
