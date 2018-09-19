//@flow
import React, { Component } from "react";
import ExpressListTable from '../../components/deliverSetting/expressListTable'
import Page from '../../components/public/page'

type Props = {
    location: { state: { type: string } },
    history: { push: Function }
}
export default class Express extends Component<Props, {}> {
    render() {
        return (
            <Page>
                <ExpressListTable history={this.props.history} />
            </Page>
        )
    }

}
