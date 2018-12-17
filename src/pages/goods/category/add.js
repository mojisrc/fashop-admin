import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import CategoryAdd from "@/components/goods/category/add/index";
import { Card } from "antd";

export default class GoodsCategoryAdd extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <CategoryAdd {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
