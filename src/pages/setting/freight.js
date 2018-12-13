import React, { Component } from "react";
import FreightListTable from '@/components/deliverSetting/freightListTable'
import Page from '@/components/public/page'
export default class Deliver extends Component {
    render() {
        return (
            <Page>
                <FreightListTable {...this.props} />
            </Page>
        )
    }
}
