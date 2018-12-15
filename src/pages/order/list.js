import React, { Component } from "react";
import { connect } from "dva";
import Page from "@/components/public/page";
import { View } from "react-web-dom";
import { list } from "@/models/order";
import OrderListHeader from "@/components/order/list/header"
import OrderListTable from "@/components/order/list/table"
@connect()
class List extends Component {
    render() {
        return (
            <Page>
                <OrderListHeader {...this.props} />
                <OrderListTable {...this.props} />
            </Page>
        );
    }
}
export default List;
