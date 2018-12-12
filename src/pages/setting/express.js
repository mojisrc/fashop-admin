import React, { Component } from "react";
import ExpressListTable from '../../components/deliverSetting/expressListTable'
import Page from '../../components/public/page'
export default class Express extends Component {
    render() {
        return (
            <Page>
                <ExpressListTable history={this.props.history} />
            </Page>
        )
    }

}
