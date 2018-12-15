import React, { Component } from "react";
import ExpressListTable from '@/components/deliverSetting/expressListTable/index'
import Page from '@/components/public/page/index'
export default class List extends Component {
    render() {
        return (
            <Page>
                <ExpressListTable history={this.props.history} />
            </Page>
        )
    }

}
