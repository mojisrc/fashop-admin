import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import RefundListHeader from "@/components/order/refund/list/header";
import RefundListTable from "@/components/order/refund/list/table";
import { Card } from "antd";
@connect()
export default class Refund extends Component {

    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <RefundListHeader {...this.props} />
                <RefundListTable {...this.props} />
            </Card>
            </PageHeaderWrapper>
        );
    }
}
