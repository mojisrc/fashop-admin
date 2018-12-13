import React, { Component } from "react";
import { connect } from "dva";
import Page from "@/components/public/page";
import Loadable from "react-loadable";
import { Spin } from "antd";

const OrderHeader = Loadable({
    loader: () => import("@/components/order/orderListHeader"),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    }
});
const OrderTable = Loadable({
    loader: () => import("@/components/order/orderListTable"),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    }
});

@connect()
export default class List extends Component {
    render() {
        return (
            <Page>
                <OrderHeader {...this.props} />
                <OrderTable {...this.props} />
            </Page>
        );
    }
}
