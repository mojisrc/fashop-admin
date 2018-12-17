import React, { Component } from "react";
import ShipperListTable from "@/components/shipper/list/table/index";
import { Card } from "antd";

export default class List extends Component {
    render() {
        return (
            <Card bordered={false}>
                <ShipperListTable history={this.props.history} />
            </Card>
        );
    }

}
