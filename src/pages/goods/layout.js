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
            case "category":
                router.push(`${match.url}/category`);
                break;
            case "tag":
                router.push(`${match.url}/tag`);
                break;
            case "supplier/list":
                router.push(`${match.url}/supplier/list`);
                break;
            case "brand/list":
                router.push(`${match.url}/brand/list`);
                break;
            case "relation/list":
                router.push(`${match.url}/relation/list`);
                break;
            case "body":
                router.push(`${match.url}/body`);
                break;
            default:
                break;
        }
    };

    render() {
        const tabList = [
            {
                key: "list",
                tab: "商品"
            },
            {
                key: "category",
                tab: "分类"
            },
            {
                key: "tag",
                tab: "标签"
            },
            {
                key: "supplier/list",
                tab: "供应商"
            },
            {
                key: "brand/list",
                tab: "品牌"
            },
            // {
            //     key: "relation/list",
            //     tab: "关联模板"
            // },
            {
                key: "body",
                tab: "详情"
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

