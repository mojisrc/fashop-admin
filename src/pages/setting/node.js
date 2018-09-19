import React,{ Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import SettingNodeHeader from '../../components/setting/nodeHeader'
import SettingNodeTable from '../../components/setting/nodeTable'

class SettingNode extends Component {
    render() {
        const {
            routers,
            dispatch
        } = this.props
        return (
            <Page>
                <SettingNodeHeader routers={routers} dispatch={dispatch}/>
                <SettingNodeTable routers={routers}/>
            </Page>
        )
    }
}

const mapStateToProps = ({app}) => {
    const {
        member,
        setting
    } = app
    return {
        login: member.login,
        routers: setting.routers,
    }
}

export default connect(mapStateToProps)(SettingNode)
