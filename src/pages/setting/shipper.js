//@flow
import React, { Component } from "react";
import ShipperListTable from '../../components/deliverSetting/shipperListTable'
import Page from '../../components/public/page'

type Props = {
    location: { state: { type: string } },
    history: { push: Function }
}
export default class Shipper extends Component<Props, {}> {
    render() {
        return (
            <Page>
                <ShipperListTable history={this.props.history} />
            </Page>
        )
    }

}
