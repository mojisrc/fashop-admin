import React, { Component } from "react";
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";

@connect()
class UserLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case "group":
                router.push(`${match.url}/group`);
                break;
            case "member":
                router.push(`${match.url}/member`);
                break;
            case "policy":
                router.push(`${match.url}/policy`);
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: "group",
                tab: "用户组"
            },
            {
                key: "member",
                tab: "用户"
            },
            {
                key: "policy",
                tab: "策略"
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

export default UserLayout;
