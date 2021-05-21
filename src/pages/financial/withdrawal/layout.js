import React, { Component } from "react";
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";

@connect()
class WithdrawalLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case "list":
                router.push(`${match.url}/list`);
                break;
            case "setting":
                router.push(`${match.url}/setting`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: "list",
                tab: "提现记录"
            },
            {
                key: "setting",
                tab: "设置"
            }
        ];

        const { match, children, location } = this.props;

        return (
            <PageHeaderWrapper
                hiddenBreadcrumb={true}
                tabList={tabList}
                tabActiveKey={location.pathname.replace(`${match.path}/`, "")}
                onTabChange={this.handleTabChange}
                notPolicy
            >
                {children}
            </PageHeaderWrapper>
        );
    }
}

export default WithdrawalLayout;
