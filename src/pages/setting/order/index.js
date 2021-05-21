import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import OrderProcess from "@/pages/setting/order/components/process/index";
import { Card } from "antd";

class Order extends Component {
    render() {
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'order/settingEdit'}>
                <Card bordered={false}>
                    <OrderProcess {...this.props} />
                </Card>
            </PageHeaderWrapper>
        );
    }
}


export default Order;
