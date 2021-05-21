import React, { Component } from "react";
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";

@connect()
class UserLayout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case "list":
                router.push(`${match.url}/list`);
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: "list",
                tab: "客户列表"
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
