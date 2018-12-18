import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import CategoryEdit from "@/components/goods/category/edit/index";
import { Card } from "antd";

export default class GoodsCategoryEdit extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <CategoryEdit {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
