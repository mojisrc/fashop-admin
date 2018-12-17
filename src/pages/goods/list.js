import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import GoodsListHeader from "@/components/goods/list/header";
import GoodsListTable from "@/components/goods/list/table";
import { connect } from "dva";
import { Card } from "antd";

@connect()
export default class GoodsList extends Component {
    render() {
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <GoodsListHeader {...this.props} />
                    <GoodsListTable {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
