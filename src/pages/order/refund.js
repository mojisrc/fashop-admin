import React, { Component } from "react";
import { connect } from "dva";
import Page from "@/components/public/page";
import Loadable from "react-loadable";
import { Spin } from "antd";

const RefundListHeader = Loadable({
    loader: () => import("@/components/order/refund/list/header"),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    }
});
const RefundListTable = Loadable({
    loader: () => import("@/components/order/refund/list/table"),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    }
});
@connect()
export default class Refund extends Component {

    render() {
        return (

            <Page>
                <RefundListHeader {...this.props} />
                <RefundListTable {...this.props} />
            </Page>
        );
    }
}
