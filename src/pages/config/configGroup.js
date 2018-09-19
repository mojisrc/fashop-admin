import React,{ Component } from "react";
import { connect } from "react-redux";
// import {
//     Route,
// } from "react-router-dom";
// import {View} from "react-web-dom";
// import { ThemeStyle, windowHeight } from "../../utils/style";
// import { Layout, Menu, Icon, Card, Row, Col } from 'antd';
// import styles from '../../styles/statistics/realTime.css';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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
