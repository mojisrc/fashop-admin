import React, { Component } from "react";
import ShipperListTable from '@/components/shipper/list/table/index'
import Page from '@/components/public/page/index'
export default class List extends Component {
    render() {
        return (
            <Page>
                <ShipperListTable history={this.props.history} />
            </Page>
        )
    }

}
