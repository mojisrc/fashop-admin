import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import OrderProcess from "@/components/setting/order/process/index";
import { Card } from "antd";

class Order extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <OrderProcess {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}


export default Order;
