import React, { Component } from "react";
import ShipperListTable from '@/components/deliverSetting/shipperListTable'
import Page from '@/components/public/page'
export default class Shipper extends Component {
    render() {
        return (
            <Page>
                <ShipperListTable history={this.props.history} />
            </Page>
        )
    }

}
