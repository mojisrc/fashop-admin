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
import SettingManageConfigHeader from 'components/setting/ManageConfigHeader'
import SettingManageConfigTable from 'components/setting/ManageConfigTable'
import { Tabs } from 'antd';

import SettingConfigGroup from './configGroup'


const TabPane = Tabs.TabPane;
class SettingManageConfig extends Component {
    render() {
        return (
            <Page>
                <Tabs >
                    <TabPane tab="配置管理" key="1">
                        <SettingManageConfigHeader {...this.props}/>
                        <SettingManageConfigTable/>
                    </TabPane>
                    <TabPane tab="分组管理" key="2">
                        <SettingConfigGroup/>
                    </TabPane>
                </Tabs>

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

export default connect(portal)(SettingManageConfig)
