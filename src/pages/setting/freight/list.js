import React, { Component } from "react";
import FreightListTable from '@/components/deliverSetting/freightListTable/index'
import Page from '@/components/public/page/index'
export default class Deliver extends Component {
    render() {
        return (
            <Page>
                <FreightListTable {...this.props} />
            </Page>
        )
    }
}
