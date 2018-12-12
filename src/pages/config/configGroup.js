import React,{ Component } from "react";
import { connect } from "react-redux";
import Page from 'components/public/Page'
import SettingConfigGroupHeader from 'components/setting/ConfigGroupHeader'
import SettingConfigGroupTable from 'components/setting/ConfigGroupTable'




class SettingConfigGroup extends Component {
    render() {
        return (
            <Page>
                <SettingConfigGroupHeader {...this.props}/>
                <SettingConfigGroupTable/>
            </Page>
        )
    }
}

const portal = store => {
    // const { shopCartIndex } = store.view
    return {
        login: store.app.member.login
    }
}

export default connect(portal)(SettingConfigGroup)
