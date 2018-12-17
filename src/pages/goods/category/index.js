import React, { Component } from "react";
import GoodsCategoryTable from "@/components/goods/category/list/table/index";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { connect } from "dva";
import { Card } from "antd";

@connect()
export default class GoodsCategory extends Component {
    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <GoodsCategoryTable {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
