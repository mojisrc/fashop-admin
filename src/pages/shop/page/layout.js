import React, { Component } from "react";
import { history as router } from "umi";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper/index";

@connect()
export default class Layout extends Component {
    handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case "list":
                router.push(`${match.url}/list`);
                break;
            case "extra":
                router.push(`${match.url}/extra`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: "list",
                tab: "列表"
            },
            {
                key: "extra",
                tab: "特殊"
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
