import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import { View } from "@/components/flexView";
import { list } from "@/models/order";
import OrderListHeader from "@/components/order/list/header"
import OrderListTable from "@/components/order/list/table"
import { Card } from "antd";
@connect()
class List extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <OrderListHeader {...this.props} />
                <OrderListTable {...this.props} />
            </Card>
            </PageHeaderWrapper>
        );
    }
}
export default List;
