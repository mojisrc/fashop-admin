import React from "react";
import { Link, FormattedMessage } from 'umi';
import PageHeader from "@/components/pageHeader";
import { connect } from "umi";
import GridContent from "./gridContent";
import styles from "./index.less";
import MenuContext from "@/layouts/menuContext";
import Policy from "fashop-policy";
import Exception from "@/components/exception";

// style={{ margin: '-24px -24px 0' }}
const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, policy, notPolicy, policyList, ...restProps }) => {

    let policyState = false;

    // if (typeof notPolicy !== "undefined") {
    //     policyState = true;
    // } else if (typeof policy !== "undefined" && policy && policyList.length > 0) {
    //     // 添加验证规则
    //     let policyInstance = new Policy;
    //     if (Array.isArray(policyList)) {
    //         policyList.map(({ structure }) => {
    //             policyInstance.addPolicy(structure);
    //         });
    //     }
    //     policyState = policyInstance.viewVerify(policy);
    // }
    policyState = true
    return <div className={wrapperClassName}>
        {top}
        <MenuContext.Consumer>
            {value => (
                <PageHeader
                    wide={contentWidth === "Fixed"}
                    home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
                    {...value}
                    key="pageheader"
                    {...restProps}
                    linkElement={Link}
                    itemRender={item => {
                        if (item.locale) {
                            return <FormattedMessage id={item.locale} defaultMessage={item.title} />;
                        }
                        return item.title;
                    }}
                />
            )}
        </MenuContext.Consumer>
        {policyState ? (children ? (
            <div className={styles.content}>
                <GridContent>{children}</GridContent>
            </div>
        ) : null) : <div className={styles.content}>
            <GridContent><Exception type="403" style={{ minHeight: 500, height: "80%" }} actions={" "} /></GridContent>
        </div>}
    </div>;
};

export default connect(({ setting, auth }) => ({
    contentWidth: setting.contentWidth,
    policyList: auth.selfPolicy.result.list
}))(PageHeaderWrapper);
