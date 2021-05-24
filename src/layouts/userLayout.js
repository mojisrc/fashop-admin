import React, { Fragment } from "react";
import { Link } from "umi";
import GlobalFooter from "@/components/globalFooter";
import styles from "./userLayout.less";
import logo from "@/assets/images/loginLogo.png";

const links = [
];

const copyright = (
    <Fragment>
        Copyright FaShop
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
